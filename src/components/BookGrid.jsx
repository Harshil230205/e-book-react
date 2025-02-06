import React from "react";
import BookCard from "./BookCard";

const BookGrid = ({ title, books }) => {
  return (
    <div className="px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-10">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
