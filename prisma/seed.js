const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

function bcryptPassword () {
  return new Promise(resolve => {
    const saltRounds = 10
    const plaintext = "123ewq"
    // could put function (err, salt) and function (err, hashedpassword) if handling errors is necessary
    bcrypt.genSalt(saltRounds, function (salt) {
      bcrypt.hash(plaintext, salt, function (hashedpassword) {
        resolve(hashedpassword)
      })
    })
  })
}

async function main () {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      password: "qwe123"
    }
  })
  console.log("bob success")

  await prisma.user.upsert({
    where: { email: "viola@prisma.io" },
    update: {},
    create: {
      email: "viola@prisma.io",
      password: await bcryptPassword()
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
