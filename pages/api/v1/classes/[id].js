import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"

export default async function classIdHandler (req, res) {
  console.log(res)
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

        const Class = await prisma.class.update({
          where: {
            id: parseInt(id)
          },
          data: req.body
        })
        Class ? res.status(200).json({ Class }) : res.status(404).json({ error: `Could not find class by ID ${id}` })
        break
      }

      case "DELETE": {
        await prisma.class.delete({
          where: {
            id: parseInt(req.query.id)
          }
        })
        res.status(200).json({ message: "Class deleted" })
        break
      }
    }
  } else {
    res.status(401)
  }
  res.end()
}
