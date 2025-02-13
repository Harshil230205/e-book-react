import React, { useState, useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import Pagination from "../components/Pagination";
import { baseUrl } from "../baseUrl";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

const ApproveBooks = () => {
  const adminToken = localStorage.getItem("adminBookToken");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const limit = 10;

  const fetchBooks = async (page, status = "") => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page,
        limit: limit,
        ...(status && { status }),
      });

      const response = await fetch(
        `${baseUrl}/api/admin/books/getAll?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + adminToken,
          },
        }
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalPages / limit));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;
    const { bookId, action } = confirmAction;
    try {
      const response = await fetch(
        `${baseUrl}/api/admin/books/${action}/${bookId}`,
        {
          method: action === "approve" ? "POST" : "DELETE",
          headers: {
            Authorization: "Bearer " + adminToken,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Success");
        fetchBooks(currentPage, activeTab === "all" ? "" : activeTab);
      }
    } catch (error) {
      toast.error(error?.message || "Success");
      console.error(`Error ${action}ing book:`, error);
    }
    setConfirmAction(null);
  };

  useEffect(() => {
    fetchBooks(currentPage, activeTab === "all" ? "" : activeTab);
  }, [currentPage, activeTab]);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="mb-6 bg-white shadow-md border border-gray-100 rounded-lg p-1 inline-flex">
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 text-gray-800">Book</th>
                <th className="text-left p-2 text-gray-800">Details</th>
                <th className="text-left p-2 text-gray-800">Author</th>
                <th className="text-left p-2 text-gray-800">Status</th>
                <th className="text-left p-2 text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-600">
                    Loading...
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book._id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={book.coverImage || "/placeholder-book.jpg"}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {book.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {book.publishYear}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {book.description}
                      </p>
                      <span className="text-sm text-orange-500">
                        {book.category}
                      </span>
                    </td>
                    <td className="p-2 text-gray-600">
                      <div>
                        <p className="font-medium">{book.uploadedByName}</p>
                        <p className="text-sm text-gray-500">
                          {book.uploadedBy.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          book.isApproved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {book.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setConfirmAction({
                              bookId: book._id,
                              action: "approve",
                            })
                          }
                          disabled={book.isApproved}
                          className={`inline-flex items-center px-3 py-1 border border-green-500 text-green-500 rounded-md text-sm font-medium transition-colors
      ${
        book.isApproved
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-green-50 cursor-pointer"
      }`}>
                          <FiCheck className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            setConfirmAction({
                              bookId: book._id,
                              action: "delete",
                            })
                          }
                          // disabled={book.isApproved}
                          className={`inline-flex items-center px-3 py-1 border border-red-500 text-red-500 rounded-md text-sm font-medium transition-colors`}>
                          <FiX className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {confirmAction && (
        <Modal isOpen={true} onClose={() => setConfirmAction(null)}>
          <p>Are you sure you want to {confirmAction.action} this book?</p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setConfirmAction(null)}
              className="px-4 py-2 border rounded-md transition text-sm font-medium cursor-pointer">
              Cancel
            </button>
            <button
              onClick={handleConfirmAction}
              className="px-4 py-2 border rounded-md transition text-sm font-medium cursor-pointer bg-orange-500 text-white border-orange-500 hover:bg-orange-600">
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApproveBooks;
