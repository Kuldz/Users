/* eslint-disable no-unused-vars */
// Temporary fix while the bcrypt functionality is a WIP
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import prisma from "../../../client.ts"

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
        try {
          console.log(process.env.NEXTAUTH_URL)
          const res = await fetch((process.env.NEXTAUTH_URL || ("https://" + process.env.VERCEL_URL)) + "/api/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
          })

          if (res.status === 401) {
            throw new Error("Invalid credentials")
          }

          const user = await res.json()
          if (res.ok && user) {
            console.log("user: ", user)
            return user
          }
        } catch (e) {
          const errorMessage = e.message
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
