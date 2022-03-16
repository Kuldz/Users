import { PrismaClient } from "@prisma/client"

export default async function schoolIDHandler (req, res) {
  const {
    method
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "DELETE": {
      await prisma.school.delete({
        where: {
          id: parseInt(req.query.id)
        }
      })
      res.status(204)
      break
    }
  }
}
