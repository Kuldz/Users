import prisma from "../../../client.ts"

export default async function handler (req, res) {
  const {
    method, query: { email }
  } = req

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

    case "GET": {
      if (email) {
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(404).json({ message: "User not found" })
        }
      }
      break
    }
  }
}
