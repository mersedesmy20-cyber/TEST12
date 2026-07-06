import { NextResponse } from 'next/server'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || ''
  const botToken = process.env.TELEGRAM_BOT_TOKEN || ''
  const chatId = process.env.TELEGRAM_MANAGER_CHAT_ID || ''
  const password = process.env.DASHBOARD_PASSWORD || ''

  return NextResponse.json({
    DATABASE_URL: {
      defined: dbUrl.length > 0,
      length: dbUrl.length,
      startsWith: dbUrl.substring(0, 15),
    },
    TELEGRAM_BOT_TOKEN: {
      defined: botToken.length > 0,
      length: botToken.length,
      startsWith: botToken.substring(0, 10),
    },
    TELEGRAM_MANAGER_CHAT_ID: {
      defined: chatId.length > 0,
      length: chatId.length,
    },
    DASHBOARD_PASSWORD: {
      defined: password.length > 0,
      length: password.length,
      value: password,
    }
  })
}
