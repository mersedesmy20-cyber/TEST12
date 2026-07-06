import { NextResponse } from 'next/server'
import { createTour } from '@/lib/tours'

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export async function POST(request: Request) {
  try {
    const update = await request.json()
    console.log('Received Telegram Update:', JSON.stringify(update))
    
    const message = update.message
    if (!message || !message.text) {
      return NextResponse.json({ ok: true })
    }

    const chatId = message.chat.id
    const messageText = message.text

    // Verify authorized user (CHAT_ID)
    const authorizedChatId = process.env.TELEGRAM_MANAGER_CHAT_ID
    if (authorizedChatId && String(chatId) !== String(authorizedChatId)) {
      await sendTelegramMessage(
        chatId,
        '❌ Ви не авторизовані для використання цього бота.'
      )
      return NextResponse.json({ ok: true })
    }

    // Check if message is /add command
    if (messageText.startsWith('/add')) {
      // Parse template: /add [Client Name] | [Destination] | [DD.MM.YYYY]
      const match = messageText.trim().match(/^\/add\s+(.+?)\s*\|\s*(.+?)\s*\|\s*(\d{2}\.\d{2}\.\d{4})$/)

      if (!match) {
        await sendTelegramMessage(
          chatId,
          `❌ Невірний формат повідомлення. Будь ласка, використовуйте шаблон:\n\`/add [ПІБ Клієнта] | [Напрямок] | [ДД.ММ.РРРР]\`\n\nПриклад:\n\`/add Сидоренко Анна | Єгипет, Шарм | 15.12.2026\``
        )
        return NextResponse.json({ ok: true })
      }

      const [, clientName, destination, dateStr] = match

      // Validate and parse date (DD.MM.YYYY)
      const dateParts = dateStr.split('.')
      const day = parseInt(dateParts[0], 10)
      const month = parseInt(dateParts[1], 10)
      const year = parseInt(dateParts[2], 10)

      const departureDate = new Date(year, month - 1, day)

      if (isNaN(departureDate.getTime())) {
        await sendTelegramMessage(chatId, '❌ Невірна дата. Будь ласка, перевірте правильність введеної дати.')
        return NextResponse.json({ ok: true })
      }

      // Create tour and generate tasks
      const tour = await createTour({
        clientName: clientName.trim(),
        destination: destination.trim(),
        departureDate,
        source: 'telegram',
      })

      // Get deadlines for response
      const insuranceTask = tour.tasks.find(t => t.taskType === 'insurance')
      const paymentTask = tour.tasks.find(t => t.taskType === 'payment')
      const documentsTask = tour.tasks.find(t => t.taskType === 'documents')

      const responseText = `✅ Тур успішно додано! Автоматично створено завдання: Страховка (до ${formatDate(insuranceTask!.deadlineDate)}), Доплата (до ${formatDate(paymentTask!.deadlineDate)}), Документи (до ${formatDate(documentsTask!.deadlineDate)}).`

      await sendTelegramMessage(chatId, responseText)
    } else {
      // Welcome message / help
      await sendTelegramMessage(
        chatId,
        `👋 Вітаємо в системі автоматизації Glorious Travel!\n\nЩоб додати новий тур, використовуйте команду:\n\`/add [ПІБ Клієнта] | [Напрямок] | [ДД.ММ.РРРР]\`\n\nПриклад:\n\`/add Сидоренко Анна | Єгипет, Шарм | 15.12.2026\``
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message || 'Webhook internal error' }, { status: 500 })
  }
}

async function sendTelegramMessage(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) {
    console.error('Missing TELEGRAM_BOT_TOKEN environment variable')
    return
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error(`Telegram sendMessage error: ${errText}`)
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error)
  }
}
