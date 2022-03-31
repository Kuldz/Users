import { PrismaClient } from "@prisma/client"

// Adds prisma to the NodeJS global type
// Note: I believe this has been deprecated since 15.12.2, but unless we care about removing 1 additional dependancy, this does not need to be refactored for some time ...
// ... As this is just a quick bodge.
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma
