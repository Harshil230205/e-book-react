import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Wrapper from "./Wrapper";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const books = [
    {
      title: "The Art of Web Development",
      year: "2024",
      description:
        "A modern guide to web development covering HTML, CSS, JavaScript, and frameworks.",
      image: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
      link: "#",
    },
    {
      title: "React Mastery",
      year: "2023",
      description:
        "An advanced book on React.js, hooks, state management, and performance optimization.",
      image: "https://edit.org/img/blog/m68-book-cover-templates.webp",
      link: "#",
    },
    {
      title: "The Art of Web Development",
      year: "2024",
      description:
        "A modern guide to web development covering HTML, CSS, JavaScript, and frameworks.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      link: "#",
    },
    {
      title: "React Mastery",
      year: "2023",
      description:
        "An advanced book on React.js, hooks, state management, and performance optimization.",
      image: "https://edit.org/img/blog/d3s-design-book-covers.webp",
      link: "#",
    },
    {
      title: "The Art of Web Development",
      year: "2024",
      description:
        "A modern guide to web development covering HTML, CSS, JavaScript, and frameworks.",
      image: "https://edit.org/img/blog/t9i-edit-book-covers-online.webp",
      link: "#",
    },
    {
      title: "React Mastery",
      year: "2023",
      description:
        "An advanced book on React.js, hooks, state management, and performance optimization.",
      image:
        "https://edit.org/img/blog/vnl-1024-ebook-cover-maker-online-free-template.webp",
      link: "#",
    },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="text-black px-6 md:px-0 mb-8 relative">
        <h1 className="text-5xl font-bold mb-6">READ AND ADD YOUR INSIGHT</h1>
        <p className="text-xl mb-8">
          Find Your Favorite Book And Read It Here For Free
        </p>
        <div
          className="bg-[#F5F6F8] rounded-full flex items-center p-2 max-w-lg border border-gray-400"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}>
          <input
            type="text"
            placeholder="Search book"
            className="w-full px-4 py-2 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="p-2 text-gray-600">
            <FiSearch className="w-6 h-6" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {isFocused && searchQuery && (
          <div className="absolute top-full max-w-lg left-0 w-full mt-2 bg-white border border-gray-200 shadow-sm rounded-lg z-10 max-h-72 overflow-y-auto">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border-b last:border-none">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{book.title}</h3>
                    <p className="text-xs text-gray-500">{book.year}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-3 text-center text-gray-500">
                No suggestions found
              </p>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex justify-end">
        <img
          src="/src/assets/image.png"
          alt="Reader"
          className="w-full rounded-4xl"
        />
      </div>
    </div>
  );
};

export default Hero;
