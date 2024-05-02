import React, { useState } from "react"

import BookCardContainer from "./BookCardContainer"
import { usePage } from "@/context/PageProvider"

import SideBar from "./SideBar"
import { UserSettingForm } from "./UserSettingForm"
import { getBookList, postFilteredBookList } from "@/services/api/bookapi"
import UserProfile from "./UserProfile"
import BookFilter from "./BookFilter"

export default function Home() {
  const allbookdata = getBookList()
  const { activePage } = usePage()
  const [filteredData, setFilteredData] = useState(null)

  if (!allbookdata) {
    return null
  }

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
        <BookFilter onSearch={handleSearch} />
        {activePage === "Home" ? (
          <BookCardContainer data={filteredData || allbookdata} />
        ) : activePage === "My Order" ? (
          <div>My Order</div>
        ) : activePage === "Setting" ? (
          <UserProfile />
        ) : null}
      </div>
    </div>
  )
}
