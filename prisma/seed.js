const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

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

  const saltRounds = 10
  const plaintext = "123ewq"
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(plaintext, salt, function(err, hashedpassword) {
      console.log(hashedpassword)
    });
  });

  await prisma.user.upsert({
    where: { email: "viola@prisma.io" },
    update: {},
    create: {
      email: "viola@prisma.io",
      password: hashedpassword
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
