const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main () {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      password: "qwe123"
    }
  })
  console.log("success")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
