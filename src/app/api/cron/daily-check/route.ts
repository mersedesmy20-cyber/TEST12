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
    
    // Find tasks: status === "PENDING", isNotified === false, deadlineDate <= now
    const pendingTasks = await prisma.task.findMany({
      where: {
        status: 'PENDING',
        isNotified: false,
        deadlineDate: {
          lte: now,
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

    let successCount = 0
    let failCount = 0

    for (const task of pendingTasks) {
      // Notification template matching requirement:
      // 🔔 Нагадування по туру для Glorious Travel!
      // 👤 Клієнт: {clientName}
      // 🌍 Напрямок: {destination}
      // ✈️ Виліт: {departureDate}
      //
      // ⚠️ Дія: {taskName}
      // 📅 Дедлайн: СЬОГОДНІ ({deadlineDate})
      const message = `🔔 Нагадування по туру для Glorious Travel!
👤 Клієнт: ${task.tour.clientName}
🌍 Напрямок: ${task.tour.destination}
✈️ Виліт: ${formatDate(task.tour.departureDate)}

⚠️ Дія: ${task.taskName}
📅 Дедлайн: СЬОГОДНІ (${formatDate(task.deadlineDate)})`

      try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: managerChatId,
            text: message,
          }),
        })

        if (response.ok) {
          // Mark task as notified in DB
          await prisma.task.update({
            where: { id: task.id },
            data: { isNotified: true },
          })
          successCount++
        } else {
          const errText = await response.text()
          console.error(`Telegram API error for task ${task.id}: ${errText}`)
          failCount++
        }
      } catch (err) {
        console.error(`Failed to send notification for task ${task.id}:`, err)
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
