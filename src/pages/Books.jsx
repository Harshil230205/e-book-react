import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import Wrapper from "../components/Wrapper";
import BookGrid from "../components/BookGrid";
import Pagination from "../components/Pagination";
import { baseUrl } from "../baseUrl";
import toast from "react-hot-toast";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        query: searchQuery,
        category: selectedCategory,
        year: selectedYear,
        page: currentPage,
        limit: limit,
      });
      const response = await fetch(
        `${baseUrl}/api/books/getAll?${queryParams}`
      );
      const data = await response.json();
      if (response.ok) {
        setBooks(data.books);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message || "Failed to fetch books");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedCategory, selectedYear, currentPage]);

  return (
    <Wrapper>
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {loading ? (
        <p className="text-center text-gray-500">Loading books...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <BookGrid title="Latest E-Books" books={books} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Books;
