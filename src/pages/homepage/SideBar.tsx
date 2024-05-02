import React, { useContext, useState } from "react"
import { IoBookOutline, IoHomeOutline } from "react-icons/io5"
import { IoIosArrowForward } from "react-icons/io"
import { BsArchive } from "react-icons/bs"
import { CiSettings } from "react-icons/ci"
import { CiLogin } from "react-icons/ci"
import Login from "../loginpage/Login"
import { Router, Link } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"
import { usePage } from "@/context/PageProvider"

export default function SideBar() {
  const [open, setOpen] = useState(true)
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  )
  const { activePage, setActivePage } = usePage()

  const { token } = useAuth()

  const Menus = [
    {
      title: "Home",
      icon: <IoHomeOutline size={24} />,
    },
    {
      title: isAuthenticated ? "My Order" : "",
      icon: isAuthenticated ? <BsArchive size={24} /> : null,
    },
    {
      title: isAuthenticated ? "Setting" : "",
      icon: isAuthenticated ? <CiSettings size={24} /> : null,
    },
    {
      title: isAuthenticated ? "Logout" : "Login",
      icon: <CiLogin size={24} />,
    },
  ]

  const handleTitleClick = (title: string) => {
    setActiveTitle(title)
    if (title === "Logout") {
      localStorage.removeItem("token")
      setIsAuthenticated(false)
    }
  }

  return (
    <div className="flex h-screen ">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-white  p-5 round-md pt-8 relative duration-300`}
      >
        <IoIosArrowForward
          className={`absolute cursor-pointer -right-0 top-9 w-7 
               border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          size={30}
        />
        <div className="flex gap-x-4 items-center">
          <IoBookOutline
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            size={24}
          />
          <h1
            className={`text-[#F29760] origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Book Store
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-500 text-lg items-center gap-x-4 font-medium ${
                activeTitle === Menu.title &&
                "bg-light-white text-[#F29760] font-semibold"
              } `}
              onClick={() => {
                handleTitleClick(Menu.title)
                setActivePage(Menu.title)
              }}
            >
              <span
                className={`   origin-left duration-200 ${
                  activeTitle === Menu.title && " text-[#F29760]"
                }`}
              >
                {Menu.icon}
              </span>
              <span
                className={`${!open && "hidden"}    origin-left duration-200 ${
                  activeTitle === Menu.title && " text-[#F29760]"
                }`}
              >
                <Link to={Menu.title === "Login" ? "/login" : ""}>
                  {Menu.title}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
