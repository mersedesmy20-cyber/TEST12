import { NextResponse } from 'next/server'

export async function GET() {
  const envKeys = Object.keys(process.env).map(key => {
    const val = process.env[key] || '';
    return {
      key,
      length: val.length,
      startsWith: val.substring(0, 15)
    }
  });

  return NextResponse.json({
    envKeys,
    DATABASE_URL: process.env.DATABASE_URL ? "defined" : "undefined",
    POSTGRES_URL: process.env.POSTGRES_URL ? "defined" : "undefined",
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL ? "defined" : "undefined",
  })
}
