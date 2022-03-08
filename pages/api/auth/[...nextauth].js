import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "bob@prisma.io" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize (credentials, req) {
        console.log("made it to authorize")
        console.log("credentials", credentials)
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (user && user.password === credentials.password) {
            // Any object returned will be saved in `user` property of the JWT
            console.log("Authorization successful!", user)
            return user
          }
        } catch (e) {
          console.log(e)
          const errorMessage = e.response.data.message
          throw new Error(errorMessage + "&email=" + credentials.email)
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    error: "/login"
  }
})
