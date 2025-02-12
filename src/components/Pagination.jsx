import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center gap-4 mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 border rounded-md text-orange-500 border-orange-400 hover:bg-orange-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
      <FaChevronLeft className="w-4 h-4" />
      Previous
    </button>
    <div className="flex items-center gap-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 border rounded-md transition text-sm font-medium ${
            currentPage === index + 1
              ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              : "text-orange-500 border-orange-400 hover:bg-orange-100"
          }`}>
          {index + 1}
        </button>
      ))}
    </div>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 border rounded-md text-orange-500 border-orange-400 hover:bg-orange-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
      Next
      <FaChevronRight className="w-4 h-4" />
    </button>
  </div>
);

export default Pagination;
