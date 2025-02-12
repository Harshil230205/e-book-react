import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden h-full">
      <div className="relative pt-[60%] sm:pt-[80%]">
        <img
          src={book?.coverImage}
          alt={book?.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
            {book?.title}
          </h3>
          <span className="text-gray-500 text-xs sm:text-sm">
            {book?.publishYear}
          </span>
          <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-3">
            {book?.description}
          </p>
        </div>

        <Link
          to={`/books/${book._id}`}
          className="mt-4 bg-orange-100 border text-center border-orange-400 text-orange-400 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition duration-300">
          Read Now
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
