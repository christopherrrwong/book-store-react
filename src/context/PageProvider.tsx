import { PropsWithChildren, createContext, useContext, useState } from "react"

type pageData = {
  activePage: ""
  setActivePage: (page: string) => {}
}

const AuthContext = createContext<pageData>({} as pageData)

export default function PageProvider({ children }: PropsWithChildren<any>) {
  const [activePage, setActivePage] = useState("Home")

  return (
    <AuthContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const usePage = () => useContext(AuthContext)
