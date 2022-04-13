import prisma from "../../../../client.ts"
import { getSession } from "next-auth/react"

export default async function teacherEmailHandler (req, res) {
  const session = await getSession({ req })

  if (session) {
    const {
      method, query: { page, email }
    } = req

    switch (method) {
      case "POST": {
        console.log(req.body)
        const teacher = await prisma.teacher.create({
          data: req.body.teacher
        })
        res.status(201).json(teacher)
        break
      }

      case "GET": {
        if (!email) {
          const [teachers, totalCount] = await prisma.$transaction([
            prisma.teacher.findMany({
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
            prisma.teacher.count()
          ])
          res.status(200).json({ teachers, totalCount })
          break
        } else if (email) {
          const teacher = await prisma.teacher.findUnique({
            where: {
              email: email
            }
          })
          if (teacher) {
            res.status(200).json(teacher)
          } else {
            res.status(404).json({ message: "Teacher not found" })
          }
        }
      }
    }
  } else {
    res.status(401)
  }
  res.end()
}
