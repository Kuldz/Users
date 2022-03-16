import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function useUser () {
  const { data: session, status } = useSession()
  const router = useRouter()
  // This produces a react-hooks/exhaustive-deps warning because it's not inside the useEffect hook,
  // but putting it into the hook causes it to change into a react-hooks/rules-of-hooks error,
  // so I've just opted to ignore it.

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status])

  return session?.user
}
