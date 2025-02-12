import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-gray-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xl font-semibold">WeTeach E-Books</h3>
        <p className="text-sm mt-2">
          Explore a vast collection of e-books and read anytime, anywhere.
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white transition">
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} WeTeach. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
