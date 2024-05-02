import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCatoryList, postFilteredBookList } from "@/services/api/bookapi"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function BookFilter({ onSearch }) {
  const category_data = getCatoryList()

  const [booktitle, setBookTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRating, setSelectedRating] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [price, setPrice] = useState("")

  const handleSearch = () => {
    onSearch(
      booktitle,
      author,
      selectedCategory,
      selectedRating,
      selectedPriceRange,
      price
    )
  }

  return (
    <div className="w-3/4 bg-white p-4 rounded-md shadow-md mt-5 p-32 flex flex-col items-center">
      <div className="flex gap-4">
        <div className="grid w-full max-w-sm items-center ">
          <Label className="mb-2" htmlFor="book_title">
            Book Titles
          </Label>
          <Input
            type="text"
            placeholder="Book Name"
            value={booktitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="mb-2" htmlFor="price">
            Price
          </Label>
          <div className="flex ">
            <Select
              defaultValue={selectedPriceRange}
              onValueChange={(value) => setSelectedPriceRange(value)}
            >
              <SelectTrigger className="w-[280px] rounded-r-none">
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="larger_than">Larger than</SelectItem>
                <SelectItem value="around">around</SelectItem>
                <SelectItem value="smaller_than">Smaller than</SelectItem>
              </SelectContent>
              <Input
                type="number"
                placeholder="Book price"
                className="rounded-l-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Select>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="mb-2" htmlFor="author">
            Authors
          </Label>
          <Input
            type="text"
            placeholder="Book authors"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="mb-2" htmlFor="categories">
            categories
          </Label>
          <Select
            defaultValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.isArray(category_data) &&
                  category_data.map((category) => {
                    return (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    )
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="mb-2" htmlFor="rating">
            Rating
          </Label>
          <Select
            defaultValue={selectedRating}
            onValueChange={(value) => setSelectedRating(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[1, 2, 3, 4, 5].map((rating: number) => (
                  <SelectItem value={rating.toString()} key={rating}>
                    <label>
                      {Array(rating)
                        .fill(0)
                        .map((_, index) => (
                          <span
                            className="star"
                            style={{
                              color: "#ffc107",
                            }}
                            key={index}
                          >
                            &#9733;
                          </span>
                        ))}
                    </label>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5">
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  )
}
