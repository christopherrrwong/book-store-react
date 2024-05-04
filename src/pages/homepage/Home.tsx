import React, { useState } from "react"

import BookCardContainer from "./BookCardContainer"
import { usePage } from "@/context/PageProvider"

import SideBar from "./SideBar"
import { UserSettingForm } from "./UserSettingForm"
import {
  getBookList,
  getBookOrderHistory,
  postFilteredBookList,
} from "@/services/api/bookapi"
import UserProfile from "./UserProfile"
import BookFilter from "./BookFilter"
import { OrderTable } from "./OrderTable"
import { useAuth } from "@/context/AuthProvider"

export default function Home() {
  const all_book_data = getBookList()
  const { activePage } = usePage()
  const [filteredData, setFilteredData] = useState(null)
  console.log(activePage)
  if (!all_book_data) {
    return null
  }
  const { user_id } = useAuth()

  const order_data = getBookOrderHistory(user_id)

  const handleSearch = async (
    booktitle: string,
    author: string,
    selectedCategory: string,
    selectedRating: string,
    selectedPriceRange: string,
    price: string
  ) => {
    const data = await postFilteredBookList(
      booktitle,
      author,
      selectedCategory,
      selectedRating,
      selectedPriceRange,
      price
    )

    setFilteredData(data)
  }

  return (
    <div className="min-h-screen w-full bg-[#E0E1E3] flex overflow-auto">
      <SideBar />
      <div className="flex flex-col items-center w-full">
        {activePage === "Home" ? (
          <>
            <BookFilter onSearch={handleSearch} />
            <BookCardContainer data={filteredData || all_book_data} />
          </>
        ) : activePage === "My Order" ? (
          <OrderTable data={order_data} />
        ) : activePage === "Setting" ? (
          <UserProfile />
        ) : null}
      </div>
    </div>
  )
}
