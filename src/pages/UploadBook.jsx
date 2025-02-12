import React, { useState } from "react";
import { IoCloudUpload, IoArrowBack } from "react-icons/io5";
import { baseUrl } from "../baseUrl";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const UploadBook = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("bookToken");

  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    publishYear: new Date().getFullYear(),
    coverImage: null,
    pdf: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    if (name === "coverImage" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      const response = await fetch(`${baseUrl}/api/books/upload`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: submitData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Upload successfully");
        navigate(-1);
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message || "Something want wrong");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Link
        to={"/"}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 group">
        <IoArrowBack className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Books</span>
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Upload New Book</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            {coverPreview ? (
              <div className="relative w-full max-w-xs">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverPreview(null);
                    setFormData((prev) => ({ ...prev, coverImage: null }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                  ×
                </button>
              </div>
            ) : (
              <div className="text-center">
                <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                <label className="mt-2 cursor-pointer">
                  <span className="text-orange-500 hover:text-orange-600">
                    Upload cover image
                  </span>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author (optional)
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publish Year
              </label>
              <input
                type="number"
                name="publishYear"
                required
                min="1900"
                max={new Date().getFullYear()}
                value={formData.publishYear}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              PDF File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="space-y-1 text-center">
                <IoCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-orange-500 hover:text-orange-600">
                    <span>Upload PDF file</span>
                    <input
                      type="file"
                      name="pdf"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.pdf && (
                  <p className="text-sm text-gray-500">
                    Selected: {formData.pdf.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
