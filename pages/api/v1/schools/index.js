import { PrismaClient } from "@prisma/client"

export default async function schoolIDHandler (req, res) {
  const {
    method
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
      const schools = await prisma.school.findMany()
      res.status(200).json(schools)
      break
    }
  }
}
