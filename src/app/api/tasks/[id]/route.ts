import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status || !['PENDING', 'COMPLETED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid or missing status' }, { status: 400 })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updatedTask)
  } catch (error: any) {
    console.error('Error updating task (PATCH):', error)
    return NextResponse.json({ error: error.message || 'Failed to update task' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status || !['PENDING', 'COMPLETED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid or missing status' }, { status: 400 })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updatedTask)
  } catch (error: any) {
    console.error('Error updating task (POST):', error)
    return NextResponse.json({ error: error.message || 'Failed to update task' }, { status: 500 })
  }
}
