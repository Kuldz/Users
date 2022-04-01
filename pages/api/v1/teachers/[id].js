import prisma from "../../../../client.ts"
import { getSession } from "next-auth/react"

export default async function teacherIdHandler (req, res) {
  const session = await getSession({ req })

  if (session) {
    const {
      query: { id },
      method
    } = req

    switch (method) {
      case "PUT": {
        for (const key in req.body) {
          if (req.body[key] === null) { delete req.body[key] }
        }

        const Teacher = await prisma.teacher.update({
          where: {
            id: parseInt(id)
          },
          data: req.body
        })
        Teacher ? res.status(200).json({ Teacher }) : res.status(404).json({ error: `Could not find teacher by ID ${id}` })
        break
      }

      case "DELETE": {
        await prisma.teacher.delete({
          where: {
            id: parseInt(req.query.id)
          }
        })
        res.status(200).json({ message: "Teacher deleted" })
        break
      }
    }
  } else {
    res.status(401)
  }
  res.end()
}
