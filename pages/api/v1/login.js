import prisma from "../../../client.ts"

export default async function handler (req, res, inputPassword) {
  console.log("(From Login)", inputPassword)
  const {
    method
  } = req

  console.log("(Req)", req.body)

  if (method !== "POST") return res.status(405).json({ error: "Method not allowed" })
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })

  if (user && inputPassword === req.body.password) {
    // Any object returned will be saved in `user` property of the JWT
    console.log("Authorization successful!", user)
    res.status(200).json(user)
  } else {
    res.status(401).json("Authorization unsuccessful, please check your credentials!")
  }
}
