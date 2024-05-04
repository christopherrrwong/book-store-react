import { postLogin } from "@/services/api/userapi"
import { PropsWithChildren, createContext, useContext, useState } from "react"

type AuthData = {
  token: string | null
  user_id: string | null
  isAuthenticated: boolean
  logout: () => void
  login: (email: string, password: string) => void
  errorMessage: string
}

const AuthContext = createContext<AuthData>({} as AuthData)

export default function AuthProvider({ children }: PropsWithChildren<any>) {
  const token = localStorage.getItem("token")
  const user_id = localStorage.getItem("id")

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)
  const [errorMessage, setErrorMessage] = useState("")

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("username")
    window.location.href = "/"
  }

  const login = async (email: string, password: string) => {
    const result = await postLogin(email, password)

    if (result.error) {
      setErrorMessage(result.error)
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    }

    localStorage.setItem("username", result.username)
    localStorage.setItem("token", result.token)
    localStorage.setItem("id", result.id)

    if (result.token) {
      window.location.href = "/"
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, user_id, isAuthenticated, logout, login, errorMessage }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
