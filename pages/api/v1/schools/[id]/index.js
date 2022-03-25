import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"

export default async function schoolIdHandler (req, res) {
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

        const School = await prisma.school.update({
          where: {
            id: parseInt(id)
          },
          data: req.body
        })
        School ? res.status(200).json({ School }) : res.status(404).json({ error: `Could not find school by ID ${id}` })

        const regCode = School.regCode

        if (regCode.toString().length !== 8 || regCode < 0) {
          return console.error("incorrect format")
        }
        break
      }

      case "DELETE": {
        await prisma.school.delete({
          where: {
            id: parseInt(req.query.id)
          }
        })
        res.status(200).json({ message: "School deleted" })
        break
      }
    }
  } else {
    res.status(401)
  }
  res.end()
}
