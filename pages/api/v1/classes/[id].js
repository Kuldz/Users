import { PrismaClient } from "@prisma/client"

export default async function handler (req, res) {
  const {
    query: { id },
    method
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "PUT": {
      for (const key in req.body) {
        // if (key === 'clientId')
        //    continue
        if (req.body[key] === null) { delete req.body[key] }
      }

      const Class = await prisma.class.update({
        where: {
          id: parseInt(id)
        },
        data: req.body
      })
      Class ? res.status(200).json({ Class }) : res.status(404).json({ error: `Could not find class by ID ${id}` })
    }
  }
}
