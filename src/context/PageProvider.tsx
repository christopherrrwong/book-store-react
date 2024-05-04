import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react"

type pageData = {
  activePage: "Home" | "My Order" | "Setting"
  setActivePage: Dispatch<SetStateAction<"Home" | "My Order" | "Setting">>
}
const AuthContext = createContext<pageData>({} as pageData)

export default function PageProvider({ children }: PropsWithChildren<any>) {
  const [activePage, setActivePage] = useState<"Home" | "My Order" | "Setting">(
    "Home"
  )

  return (
    <AuthContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const usePage = () => useContext(AuthContext)
