import prisma from "../../../../client.ts"
import { getSession } from "next-auth/react"

export default async function classIdHandler (req, res) {
  const session = await getSession({ req })

  if (session) {
    const {
      method, query: { page }
    } = req

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
              teacher: {
                select: {
                  firstName: true
                }
              },
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
