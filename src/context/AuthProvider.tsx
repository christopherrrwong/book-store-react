import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type AuthData = {
  token: string
  user_id: number
}

const AuthContext = createContext<AuthData>({} as AuthData)

export default function AuthProvider({ children }: PropsWithChildren<any>) {
  const token = localStorage.getItem("token")
  const user_id = localStorage.getItem("id")

  return (
    <AuthContext.Provider value={{ token, user_id }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
