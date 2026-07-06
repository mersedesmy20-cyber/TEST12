import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createTour } from '@/lib/tours'

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        tasks: {
          orderBy: { deadlineDate: 'asc' },
        },
      },
    })
    return NextResponse.json(tours)
  } catch (error: any) {
    console.error('Error fetching tours:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch tours' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientName, destination, departureDate } = body

    if (!clientName || !destination || !departureDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const tour = await createTour({
      clientName: clientName.trim(),
      destination: destination.trim(),
      departureDate: new Date(departureDate),
      source: 'web',
    })

    return NextResponse.json(tour)
  } catch (error: any) {
    console.error('Error creating tour:', error)
    return NextResponse.json({ error: error.message || 'Failed to create tour' }, { status: 500 })
  }
}
