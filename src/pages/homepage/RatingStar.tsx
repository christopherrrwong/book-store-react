import React, { useState } from "react"

export default function RatingStar() {
  const [totalStars, setTotalStars] = useState(5)

  return (
    <>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1

        return (
          <label key={index}>
            <span
              className="star"
              style={{
                color: "#ffc107",
              }}
            >
              &#9733;
            </span>
          </label>
        )
      })}
    </>
  )
}
