import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"

export default async function studentIdHandler (req, res) {
  const session = await getSession({ req })

  if (session) {
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
  } else {
    res.status(401)
  }
  res.end()
}
