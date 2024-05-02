import { useQuery } from "@tanstack/react-query"
import { source } from "./source"

export async function postLogin(email: string, password: string) {
  const res = await fetch(`${source}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })

  const result = await res.json()
  console.log(result)
  return result
}

export function getUserInfo(user_id: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["userInfo", user_id],
    queryFn: async () => {
      const res = await fetch(`${source}/user/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      const resp = await res.json()

      return resp
    },
  })

  if (isLoading || isFetching) return "Data is coming"

  if (error) {
    return { error: error }
  }

  if (!data) {
    return []
  }

  return data
}
