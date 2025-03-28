import React, { useState } from "react";
import Wrapper from "./Wrapper";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const token = localStorage.getItem("bookToken");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 shadow-md">
      <Wrapper className="flex justify-between items-center relative">
        <Link to={"/"} className="text-2xl font-bold">
          E-BOOK
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600">
            Home
          </Link>
          <Link to="/books" className="text-gray-600">
            Books
          </Link>
          <Link to="/books/upload" className="text-gray-600">
            Upload
          </Link>
          <Link to="/books/my-books" className="text-gray-600">
            My books
          </Link>
          {token ? (
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="cursor-pointer bg-white text-black px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition duration-300">
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="login"
                className="bg-black text-white px-6 py-2 rounded-full border-2 border-black hover:bg-white hover:text-black transition duration-300 mr-3">
                Log in
              </Link>
              <Link
                to="signup"
                className="bg-white text-black px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition duration-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-800 cursor-pointer">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden transition-transform transform ease-in-out duration-300 z-50">
            <Link
              to="/"
              className="text-gray-600"
              onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link
              to="/books"
              className="text-gray-600"
              onClick={() => setMenuOpen(false)}>
              Books
            </Link>
            <Link
              to="/books/upload"
              className="text-gray-600"
              onClick={() => setMenuOpen(false)}>
              Upload
            </Link>
            <Link
              to="/books/my-books"
              className="text-gray-600"
              onClick={() => setMenuOpen(false)}>
              My books
            </Link>
            {token ? (
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="cursor-pointer bg-white text-black px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition duration-300">
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="login"
                  className="bg-black text-white px-6 py-2 rounded-full border-2 border-black hover:bg-white hover:text-black transition duration-300"
                  onClick={() => setMenuOpen(false)}>
                  Log in
                </Link>
                <Link
                  to="signup"
                  className="bg-white text-black px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition duration-300"
                  onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </Wrapper>
    </nav>
  );
};

export default Navbar;
