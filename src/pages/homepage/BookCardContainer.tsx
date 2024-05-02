import { Button } from "@/components/ui/button"
import RatingStar from "./RatingStar"

type data = {
  id: number
  book_title: string
  book_description: string
  author: string
  publisher: string
  rating: number
  book_image: string
  price_in_cent: number
}

type BookCardItemProps = {
  data: data[]
}

export default function BookCardContainer({ data }: BookCardItemProps) {
  return (
    <>
      {data.length == 0 ? (
        <div className="p-10">No search results found </div>
      ) : (
        <div>
          <div className="grid grid-cols-5 gap-10 p-10">
            {Array.isArray(data) &&
              data.map((book) => (
                <div
                  key={book.id}
                  className="bg-white p-4 rounded-md shadow-md flex flex-col"
                >
                  <img
                    src={book.book_image}
                    alt={book.book_title}
                    className="h-4/6 w-full object-cover rounded-md"
                  />
                  <div className="flex justify-between gap-y-2 mt-4">
                    <div className="flex flex-col ">
                      <h2 className="text-lg font-semibold">
                        {book.book_title}
                      </h2>
                      <p className="text-sm text-gray-500">{book.author}</p>
                      <div className="flex">
                        <RatingStar />
                      </div>
                      <p className="text-sm text-gray-500">{book.publisher}</p>
                      <p className="text-sm text-gray-500">
                        {book.price_in_cent}$
                      </p>
                    </div>
                    <Button className="rounded-full bg-[#ffc107]">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}
