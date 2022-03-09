import { PrismaClient } from "@prisma/client"

export default async function schoolIDHandler (req, res) {
  const {
    method, id
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "POST": {
      console.log(req.body)
      const newClass = await prisma.class.create({
        data: req.body.class
      })
      res.status(201).json(newClass)
      break
    }
    case "GET": {
      const classes = await prisma.class.findMany({
        include: {
          school: {
            select: {
              name: true
            }
          }
        }
      })
      res.status(200).json(classes)
      break
    }
    case "DELETE": {
      await prisma.class.delete({
        where: {
          id: id
        }
      })
      res.status(204)
      break
    }
  }
}
