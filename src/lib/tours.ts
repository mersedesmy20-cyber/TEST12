import { prisma } from './prisma'

export async function createTour(data: {
  clientName: string
  destination: string
  departureDate: Date
  source: 'web' | 'telegram'
}) {
  const { clientName, destination, departureDate, source } = data

  const now = new Date()
  
  // 1. Страховка: deadlineDate = departureDate мінус 4 місяці.
  // Якщо виходить у минулому, то ставимо на "сьогодні" (now()).
  let insuranceDeadline = new Date(departureDate)
  insuranceDeadline.setMonth(insuranceDeadline.getMonth() - 4)
  if (insuranceDeadline.getTime() < now.getTime()) {
    insuranceDeadline = new Date(now)
  }

  // 2. Доплата: deadlineDate = departureDate мінус 3 місяці.
  // Якщо виходить у минулому, то ставимо на "сьогодні" (now()).
  let paymentDeadline = new Date(departureDate)
  paymentDeadline.setMonth(paymentDeadline.getMonth() - 3)
  if (paymentDeadline.getTime() < now.getTime()) {
    paymentDeadline = new Date(now)
  }

  // 3. Видача документів: deadlineDate = departureDate мінус 5 днів.
  let documentsDeadline = new Date(departureDate)
  documentsDeadline.setDate(documentsDeadline.getDate() - 5)

  // Use a transaction to ensure atomic inserts
  const tour = await prisma.tour.create({
    data: {
      clientName,
      destination,
      departureDate,
      source,
      tasks: {
        create: [
          {
            taskType: 'insurance',
            taskName: 'Оформити страховку',
            deadlineDate: insuranceDeadline,
            status: 'PENDING',
            isNotified: false,
          },
          {
            taskType: 'payment',
            taskName: 'Внести доплату за тур',
            deadlineDate: paymentDeadline,
            status: 'PENDING',
            isNotified: false,
          },
          {
            taskType: 'documents',
            taskName: 'Видати документи',
            deadlineDate: documentsDeadline,
            status: 'PENDING',
            isNotified: false,
          },
        ],
      },
    },
    include: {
      tasks: true,
    },
  })

  return tour
}
