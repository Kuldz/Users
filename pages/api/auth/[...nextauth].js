import { reject } from "bcrypt/promises"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { resolveHref } from "next/dist/shared/lib/router/router"
import fetchPassword from "../prisma/fetchPassword"
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

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
        console.log("made it to bcrypt")
        const hashedPassword = await fetchPassword(credentials)
        console.log("(From NextAuth) Data received:", hashedPassword)
        const inputPassword = credentials.password
        console.log("(From User) Data received:", inputPassword)

        /*function compareAsync(inputPassword, hashedPassword) {
          return new Promise(function(resolve, reject) {
            bcrypt.compare(inputPassword, hashedPassword, function(err, result) {
              if (result == true) {
                console.log("bcrypt PASS")
                resolve(result)
              } else {
                console.log("bcrypt FAIL")
                reject(new Error("Invalid Credentials."))
              }
            });
          })
        }

        const result = await compareAsync(inputPassword, hashedPassword)
        console.log(result)*/

        console.log("made it to authorize")
        console.log("credentials", credentials)
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
          console.log("After!")
          const user = await res.json()
          console.log("After! 2")
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
