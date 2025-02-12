import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const categories = [
  "Fiction",
  "Mystery & Thriller",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Horror",
  "Historical Fiction",
  "Adventure",
  "Contemporary Fiction",
  "Literary Fiction",
  "Dystopian",
  "Biography & Memoir",
  "Self-Help & Personal Development",
  "Business & Finance",
  "Health & Wellness",
  "Psychology",
  "Science & Technology",
  "History",
  "Philosophy",
  "Travel",
  "True Crime",
  "Education",
  "Textbooks",
  "Research & Reference",
  "Law",
  "Medical",
  "Engineering",
  "Mathematics",
  "Language Learning",
  "Children & Young Adult",
  "Picture Books",
  "Other",
];

const years = Array.from(
  { length: new Date().getFullYear() - 1899 },
  (_, i) => 1900 + i
).reverse();

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedYear,
  setSelectedYear,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => setSearchQuery(localQuery), 200);
    return () => clearTimeout(timeout);
  }, [localQuery, setSearchQuery]);

  return (
    <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center relative mt-4">
      <div className="relative flex-1 w-full">
        <input
          type="text"
          placeholder="Search for a book..."
          className="w-full p-2 pl-10 text-gray-700 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-400"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
      </div>
      <select
        className="p-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gray-400"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        className="p-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gray-400"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
