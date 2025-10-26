import React from 'react';
import StarRatings from 'react-star-ratings';

const ProductRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-4">
      <StarRatings
        rating={rating}
        starRatedColor="#D5A581"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="2px"
        name="rating"
      />
      <span className="text-sm text-gray-600">({reviews})</span>
    </div>
  );
};

export default ProductRating;
