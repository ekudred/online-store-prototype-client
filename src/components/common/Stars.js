import React from 'react'
import { Rating } from 'react-simple-star-rating'

export default function Stars({ rating, setRating, size = 25 }) {
  const onClickRating = rate => setRating(rate)

  return <Rating onClick={onClickRating} ratingValue={rating} size={size} fillColor={'rgb(246, 101, 10)'} emptyColor={'rgba(0, 0, 0, 0.2)'} />
}
