import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

export default async function handler (req, res) {
  console.log()
  // By unique identifier
  const user = await prisma.user.findUnique({
    where: {
      email: "bob@prisma.io"
    }
  })

  if (!user) {
    // Wrong username or password message
    res.status(400).json({ status: "400 Bad Request", success: false, message: "invalid credentials" })
    return
  }

  // Success
  if (req.body.password === user.password) {
    res.status(200).json({ status: "200 OK", success: true, user: user })
  }
}
