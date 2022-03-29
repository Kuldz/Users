import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"

export default async function studentEmailHandler (req, res) {
  const session = await getSession({ req })

  if (session) {
    const {
      method, query: { page, email }
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
        if (page) {
          const [students, totalCount] = await prisma.$transaction([
            prisma.student.findMany({
              skip: parseInt((page - 1) * 10) || 0,
              take: 10,
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
            }),
            prisma.student.count()
          ])
          res.status(200).json({ students, totalCount })
          break
        } else if (email) {
          const students = await prisma.student.findUnique({
            where: {
              email: email
            }
          })
          res.status(200).json(students)
        }
      }
    }
  } else {
    res.status(401)
  }
  res.end()
}
