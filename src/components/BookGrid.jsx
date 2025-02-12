import React from "react";
import BookCard from "./BookCard";

const BookGrid = ({ title, books }) => {
  return (
    <div className="px-4 py-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {books?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
