import prisma from "../../../client.ts"

async function fetchPassword (credentials) {
  const fetcher = await prisma.user.findUnique({
    where: {
      email: credentials.email
    },
    select: {
      password: true
    }
  })
  const passwordOfUser = fetcher.password
  console.log("(From FetchPassword) Data given:", passwordOfUser)
  return Promise.resolve(passwordOfUser)
}
// fetchPassword()
export default fetchPassword
