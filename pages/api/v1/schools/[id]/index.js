import { PrismaClient } from "@prisma/client"

export default async function schoolIdHandler (req, res) {
  const {
    query: { id },
    method
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "PUT": {
      for (const key in req.body) {
        if (req.body[key] === null) { delete req.body[key] }
      }

      const School = await prisma.school.update({
        where: {
          id: parseInt(id)
        },
        data: req.body
      })
      School ? res.status(200).json({ School }) : res.status(404).json({ error: `Could not find school by ID ${id}` })
      break
    }

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
