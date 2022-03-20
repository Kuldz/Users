import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
          console.log("nextauth url" + process.env.NEXTAUTH_URL)
          console.log("vercel url" + process.env.VERCEL_URL)
          console.log("next public vercel url" + process.env.NEXT_PUBLIC_VERCEL_URL)
          const res = await fetch(process.env.NEXTAUTH_URL || process.env.VERCEL_URL + "/api/v1/login", {
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
