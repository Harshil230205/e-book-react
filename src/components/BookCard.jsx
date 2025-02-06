import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm overflow-hidden max-w-2xl p-2">
      <img
        src={book?.image}
        alt={book?.title}
        className="w-full md:w-48 h-64 object-cover rounded-lg"
      />

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{book?.title}</h3>
          <span className="text-gray-500 text-sm">{book?.year}</span>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {book?.description}
          </p>
        </div>

        {book?.link && (
          <a
            href={book.link}
            className="mt-4 bg-orange-100 border text-center border-orange-400 text-orange-400 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-500 transition">
            Read Now
          </a>
        )}
      </div>
    </div>
  );
};

export default BookCard;
