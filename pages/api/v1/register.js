import prisma from "../../../client.ts"
const bcrypt = require("bcrypt")

export default async function handler (req, res) {
  const {
    method, query: { email }
  } = req

  function bcryptPassword () {
    return new Promise(resolve => {
      const saltRounds = 10
      const plainText = req.body.password
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw new Error("Unexpected error while salting")
        } else {
          bcrypt.hash(plainText, salt, function (err, hashedPassword) {
            if (err) {
              throw new Error("Unexpected error while hashing")
            } else {
              resolve(hashedPassword)
            }
          })
        }
      })
    })
  }

  switch (method) {
    case "POST": {
      console.log(req.body)
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: await bcryptPassword()
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
