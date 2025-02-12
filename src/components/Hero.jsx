import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import HeroImg from "../assets/heroImg.png";
import { baseUrl } from "../baseUrl";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const fetchSearchSuggestions = async (query) => {
    if (!query) {
      setSearchSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `${baseUrl}/api/books/getAll?query=${query}`
      );
      const data = await response.json();
      if (response.ok) {
        setSearchSuggestions(data.books);
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchSuggestions(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/books?query=${searchQuery}`);
    setSearchSuggestions([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
      <div className="text-black relative order-2 md:order-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          READ AND ADD
          <br className="hidden sm:block" /> YOUR INSIGHT
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-700">
          Find Your Favorite Book And Read It Here For Free
        </p>

        <form onSubmit={handleSearchSubmit} className="relative">
          <div
            className="bg-[#F5F6F8] rounded-full flex items-center p-2 sm:p-3 border border-gray-300 hover:border-gray-400 transition-colors duration-200"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}>
            <input
              type="text"
              placeholder="Search book"
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-transparent outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {isFocused && searchQuery && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-20 max-h-72 overflow-y-auto">
              {searchSuggestions.length > 0 ? (
                searchSuggestions.map((book) => (
                  <div
                    key={book._id}
                    className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b last:border-none"
                    onClick={() => {
                      navigate(`/books?query=${book.title}`);
                      setSearchSuggestions([]);
                    }}>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {book.publishYear}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-3 text-center text-sm sm:text-base text-gray-500">
                  No suggestions found
                </p>
              )}
            </div>
          )}
        </form>
      </div>

      <div className="order-1 md:order-2 md:flex justify-end mb-8 md:mb-0">
        <img
          src={HeroImg}
          alt="Reader"
          className="w-full max-w-lg mx-auto md:max-w-none rounded-2xl sm:rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Hero;
