import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"

export default async function schoolIDHandler (req, res) {
  const session = await getSession({ req })

  if (session) {
    const {
      method, query: { page }
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
        const [classes, totalCount] = await prisma.$transaction([
          prisma.class.findMany({
            skip: parseInt((page - 1) * 10) || 0,
            take: 10,
            include: {
              school: {
                select: {
                  name: true
                }
              }
            }
          }),
          prisma.class.count()
        ])
        res.status(200).json({ classes, totalCount, page })
        break
      }
    }
  } else {
    res.status(401)
  }
  res.end()
}
