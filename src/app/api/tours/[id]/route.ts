import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: tourId } = await params
    const body = await request.json()
    const { clientName, destination, departureDate, tasks } = body

    if (!clientName || !destination || !departureDate) {
      return NextResponse.json(
        { error: 'Missing required tour fields' },
        { status: 400 }
      )
    }

    const updatedTour = await prisma.$transaction(async (tx) => {
      // 1. Update the Tour
      const tour = await tx.tour.update({
        where: { id: tourId },
        data: {
          clientName,
          destination,
          departureDate: new Date(departureDate),
        },
      })

      // 2. Fetch existing tasks
      const existingTasks = await tx.task.findMany({
        where: { tourId },
      })
      const existingTaskIds = existingTasks.map((t) => t.id)

      // Get list of tasks to keep/update and their IDs
      const tasksToKeep = tasks.filter((t: any) => t.id && !t.id.startsWith('new-'))
      const keptTaskIds = tasksToKeep.map((t: any) => t.id)

      // 3. Delete tasks that are missing from the input tasks list
      const tasksToDelete = existingTaskIds.filter((id) => !keptTaskIds.includes(id))
      if (tasksToDelete.length > 0) {
        await tx.task.deleteMany({
          where: {
            id: { in: tasksToDelete },
          },
        })
      }

      // 4. Update existing tasks & Create new tasks
      for (const t of tasks) {
        if (!t.taskName || !t.deadlineDate) continue;

        if (t.id && !t.id.startsWith('new-')) {
          // Check if date or status changed to manage isNotified resetting
          const existingTask = existingTasks.find(et => et.id === t.id)
          const dateChanged = existingTask 
            ? new Date(existingTask.deadlineDate).getTime() !== new Date(t.deadlineDate).getTime() 
            : false

          // Update existing
          await tx.task.update({
            where: { id: t.id },
            data: {
              taskName: t.taskName,
              deadlineDate: new Date(t.deadlineDate),
              status: t.status || 'PENDING',
              isNotified: dateChanged ? false : (t.isNotified ?? false),
            },
          })
        } else {
          // Create new task
          await tx.task.create({
            data: {
              tourId,
              taskType: t.taskType || 'custom',
              taskName: t.taskName,
              deadlineDate: new Date(t.deadlineDate),
              status: t.status || 'PENDING',
              isNotified: false,
            },
          })
        }
      }

      return tx.tour.findUnique({
        where: { id: tourId },
        include: { tasks: true },
      })
    })

    return NextResponse.json(updatedTour)
  } catch (error: any) {
    console.error('Error updating tour:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update tour' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: tourId } = await params
    await prisma.tour.delete({
      where: { id: tourId },
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting tour:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete tour' },
      { status: 500 }
    )
  }
}
