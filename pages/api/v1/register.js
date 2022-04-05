import prisma from "../../../client.ts"

export default async function handler (req, res) {
  const {
    method
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
  }
}
