import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import BookGrid from "../components/BookGrid";
import Pagination from "../components/Pagination";
import { baseUrl } from "../baseUrl";
import toast from "react-hot-toast";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("all");

  const limit = 12;

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("bookToken");
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
      });

      if (activeTab !== "all") {
        queryParams.append("status", activeTab);
      }

      const response = await fetch(
        `${baseUrl}/api/books/my-books?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
  }, [currentPage, activeTab]);

  return (
    <Wrapper className={"my-8"}>
      <div className="flex space-x-4 mb-4">
        {["all", "pending", "approved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
              ${
                activeTab === tab
                  ? "bg-orange-400 text-white"
                  : "text-gray-600 hover:text-orange-600"
              }`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Books
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading books...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <BookGrid title="My Uploaded E-Books" books={books} />
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

export default MyBooks;
