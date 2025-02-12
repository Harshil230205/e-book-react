import React, { useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoBookSharp } from "react-icons/io5";
import { IoDownload } from "react-icons/io5";

const BookDetail = ({ book }) => {
  const pdfSectionRef = useRef(null);

  const scrollToPdf = () => {
    pdfSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <button className="flex items-center text-gray-600 hover:text-gray-800 mb-6 group">
        <IoArrowBack className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Books</span>
      </button>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row p-4 md:p-8 gap-8">
          <div className="flex-shrink-0 w-full lg:w-1/3">
            <img
              src={book?.coverImage}
              alt={book?.title}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="flex-grow">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {book?.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>Published: {book?.publishYear}</span>
                <span>Category: {book?.category}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {book?.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
                  {book?.category}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={scrollToPdf}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                  <IoBookSharp className="w-5 h-5" />
                  <span>Read Now</span>
                </button>
                <a
                  href={book?.pdf}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-100 border border-orange-400 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
                  <IoDownload className="w-5 h-5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={pdfSectionRef}
        className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Read Book</h2>
        </div>
        <div className="w-full h-screen p-4">
          <iframe
            src={`${"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}`}
            className="w-full h-full rounded-lg"
            title={`${book?.title} PDF Viewer`}
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
