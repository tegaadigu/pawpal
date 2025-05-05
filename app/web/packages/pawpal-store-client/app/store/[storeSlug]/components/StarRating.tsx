import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const StarRating = ({ rating = 0, maxStars = 5 }: { rating: number, maxStars?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Render Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} className="w-4 h-4 text-black-500" />
      ))}

      {/* Render Half Star */}
      {hasHalfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-4 h-4 text-black-500"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="white" />
            </linearGradient>
          </defs>
          <StarIcon fill="url(#half)" stroke="currentColor" />
        </svg>
      )}

      {/* Render Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <StarIcon key={`empty-${index}`} className="w-4 h-4 text-gray-200" />
      ))}
    </div>
  );
};

export default StarRating;
