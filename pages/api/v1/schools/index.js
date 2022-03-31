import prisma from "../../../../client.ts"
import { getSession } from "next-auth/react"

export default async function schoolIdHandler (req, res) {
  const session = await getSession({ req })

  if (session) {
    const {
      method, query: { page }
    } = req

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
        const [schools, totalCount] = await prisma.$transaction([
          prisma.school.findMany({
            skip: parseInt((page - 1) * 10) || 0,
            take: 10
          }),
          prisma.school.count()
        ])
        res.status(200).json({ schools, totalCount })
        break
      }
    }
  } else {
    res.status(401)
  }
  res.end()
}
