import prisma from "../../../client.ts"
import bcrypt from "bcrypt"

export default async function handler (req, res) {
  const {
    method
  } = req

  console.log("(From login.js)", req.body)

  if (method !== "POST") return res.status(405).json({ error: "Method not allowed" })
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })

  console.log("(User)", user)

  bcrypt.compare(req.body.password, user.password, function (_err, result) {
    // I am pretty sure ignoring the err call with a prefix is not a good idea,
    // but I haven't made one for it so it might as well be
    if (result === true) {
      console.log("bcrypt PASS")
      delete user.password
      res.status(200).json(user)
    } else {
      console.log("bcrypt FAIL")
      res.status(401).json("Invalid credentials.")
    }
  })
}
