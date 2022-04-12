const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

function violaBcryptPassword () {
  return new Promise(resolve => {
    const saltRounds = 10
    const plainText = "123ewq"
    // Edit: Putting (err) into the function parameters seemes to be necessary on some devices, so the code has been refactored to satisfy both ESLint and those odd cases.
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

function bobBcryptPassword () {
  return new Promise(resolve => {
    const saltRounds = 10
    const plainText = "qwe123"
    // Edit: Putting (err) into the function parameters seemes to be necessary on some devices, so the code has been refactored to satisfy both ESLint and those odd cases.
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

async function main () {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      password: await bobBcryptPassword()
    }
  })
  console.log("bob success")

  await prisma.user.upsert({
    where: { email: "viola@prisma.io" },
    update: {},
    create: {
      email: "viola@prisma.io",
      password: await violaBcryptPassword()
    }
  })
  console.log("viola success")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
