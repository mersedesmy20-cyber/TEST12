import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export async function GET(request: Request) {
  // Enforce Vercel cron secret in production
  const authHeader = request.headers.get('authorization')
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    if (process.env.NODE_ENV === 'production') {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  try {
    const now = new Date()
    // Trigger notification 3 days before deadline (3 days * 24h * 60m * 60s * 1000ms)
    const warningThreshold = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
    
    // Find tasks: status === "PENDING", isNotified === false, deadlineDate <= warningThreshold
    const pendingTasks = await prisma.task.findMany({
      where: {
        status: 'PENDING',
        isNotified: false,
        deadlineDate: {
          lte: warningThreshold,
        },
      },
      include: {
        tour: true,
      },
    })

    const token = process.env.TELEGRAM_BOT_TOKEN
    const managerChatId = process.env.TELEGRAM_MANAGER_CHAT_ID

    if (!token || !managerChatId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing Telegram configuration (bot token or manager chat ID)',
        },
        { status: 500 }
      )
    }

    // Support comma-separated chat IDs (e.g., personal chat and public channel @Sunicetravel)
    const chatIds = managerChatId.split(',').map(id => id.trim()).filter(id => id.length > 0)

    let successCount = 0
    let failCount = 0

    for (const task of pendingTasks) {
      const diffTime = task.deadlineDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const daysText = diffDays <= 0 
        ? 'СЬОГОДНІ / ПРОТЕРМІНОВАНО ⚠️' 
        : `через ${diffDays} дн. (${formatDate(task.deadlineDate)}) ⏳`

      const message = `🔔 Нагадування по туру для Glorious Travel!
👤 Клієнт: ${task.tour.clientName}
🌍 Напрямок: ${task.tour.destination}
✈️ Виліт: ${formatDate(task.tour.departureDate)}

⚠️ Дія: ${task.taskName}
📅 Дедлайн: ${daysText}`

      let sentSuccessfully = false

      for (const chatId of chatIds) {
        try {
          const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
            }),
          })

          if (response.ok) {
            sentSuccessfully = true
          } else {
            const errText = await response.text()
            console.error(`Telegram API error for chat ${chatId}, task ${task.id}: ${errText}`)
          }
        } catch (err) {
          console.error(`Failed to send notification to chat ${chatId} for task ${task.id}:`, err)
        }
      }

      if (sentSuccessfully) {
        // Mark task as notified in DB
        await prisma.task.update({
          where: { id: task.id },
          data: { isNotified: true },
        })
        successCount++
      } else {
        failCount++
      }
    }

    return NextResponse.json({
      success: true,
      processed: pendingTasks.length,
      sent: successCount,
      failed: failCount,
    })
  } catch (error: any) {
    console.error('Cron job error:', error)
    return NextResponse.json({ error: error.message || 'Cron job failed' }, { status: 500 })
  }
}
