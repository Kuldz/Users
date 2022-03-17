import { PrismaClient } from "@prisma/client"

export default async function schoolIDHandler (req, res) {
  const {
    method, query: { page }
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "POST": {
      console.log(req.body)
      const school = await prisma.school.create({
        data: req.body.school
      })
      res.status(201).json(school)
      break
    }
    case "GET": {
      const [schools, totalCount] = await prisma.$transaction([
        prisma.school.findMany({
          skip: parseInt((page - 1) * 10) || 0,
          take: 10
        }),
        prisma.school.count()
      ])
      res.status(200).json({ schools, totalCount })
      break
    }
  }
}
