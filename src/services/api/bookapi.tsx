import { useQuery } from "@tanstack/react-query"
import { source } from "./source"

export function getBookList() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["bookList"],
    queryFn: async () => {
      const res = await fetch(`${source}/book`, {
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

export async function postFilteredBookList(
  booktitle: string,
  author: string,
  selectedCategory: string,
  selectedRating: string,
  selectedPriceRange: string,
  price: string
) {
  const res = await fetch(`${source}/book/filter`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      booktitle,
      author,
      selectedCategory,
      selectedRating,
      selectedPriceRange,
      price,
    }),
  })

  const result = await res.json()
  return result
}

export function getCatoryList() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["categoryList"],
    queryFn: async () => {
      const res = await fetch(`${source}/category`, {
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
