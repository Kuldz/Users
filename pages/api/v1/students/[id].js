import { PrismaClient } from "@prisma/client"

export default async function studentIdHandler (req, res) {
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

      const Student = await prisma.student.update({
        where: {
          id: parseInt(id)
        },
        data: req.body
      })
      Student ? res.status(200).json({ Student }) : res.status(404).json({ error: `Could not find student by ID ${id}` })
      break
    }

    case "DELETE": {
      await prisma.student.delete({
        where: {
          id: parseInt(req.query.id)
        }
      })
      res.status(200).json({ message: "Student deleted" })
      break
    }
  }
}
