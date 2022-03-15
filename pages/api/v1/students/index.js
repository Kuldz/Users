import { PrismaClient } from "@prisma/client"

export default async function studentEmailHandler (req, res) {
  const {
    method
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "POST": {
      console.log(req.body)
      const student = await prisma.student.create({
        data: req.body.student
      })
      res.status(201).json(student)
      break
    }

    case "GET": {
      const students = await prisma.student.findMany({
        include: {
          school: {
            select: {
              name: true
            }
          },
          class: {
            select: {
              name: true
            }
          }
        }
      })
      res.status(200).json(students)
      break
    }
  }
}
