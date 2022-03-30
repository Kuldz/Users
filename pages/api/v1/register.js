import { PrismaClient } from "@prisma/client"

export default async function handler (req, res) {
  const {
    method
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "POST": {
      console.log(req.body)
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: req.body.password
        }
      })
      res.status(201).json(user)
      break
    }
  }
}
