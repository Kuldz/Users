import prisma from "../../../../../client.ts"
import { getSession } from "next-auth/react"

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (session) {
    const {
      query: { id },
      method
    } = req

    switch (method) {
      case "GET": {
        // Filter studentArray by school ID
        // const students = studentArray.filter(s => s.school_id.toString() === id)
        const students = await prisma.student.findUnique({
          where: {
            id: parseInt(id)
          }
        })

        // Return 404 if no result or OK status and students array
        students ? res.status(200).json({ students }) : res.status(404).json({ error: `Could not find student by ID ${id}` })
        break
      }

      default:
        res.status(405)
        break
    }
  } else {
    res.status(401)
  }
  res.end()
}
