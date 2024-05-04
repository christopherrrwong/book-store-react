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
    method: "POST",
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

export async function postBookOrder(user_id: string, book_id: string) {
  console.log("api called")
  console.log(user_id, book_id)
  const res = await fetch(`${source}/book/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      accept: "application/json",
    },
    body: JSON.stringify({
      user_id,
      book_id,
    }),
  })

  const result = await res.json()

  return result
}

export async function cancelBookOrder(order_id: number) {
  const res = await fetch(`${source}/book/order/${order_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      accept: "application/json",
    },
    body: JSON.stringify({
      order_id,
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

export function getBookOrderHistory(user_id: string | null) {
  if (!user_id) return []

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["OrderHistory", user_id],
    queryFn: async () => {
      const res = await fetch(`${source}/book/order-history/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
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
