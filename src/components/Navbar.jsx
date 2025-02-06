import React from "react";
import Wrapper from "./Wrapper";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 shadow-md mb-8">
      <Wrapper className="flex justify-between items-center">
        <div className="text-2xl font-bold">MYBOOK</div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-600">
            Explore
          </a>
          <a href="#" className="text-gray-600">
            Shop
          </a>
          <a href="#" className="text-gray-600">
            Blog
          </a>
          <button className="bg-white text-black px-6 py-2 rounded-full border-2 border-black hover:bg-black hover:text-white transition duration-300">
            Log in
          </button>
        </div>
      </Wrapper>
    </nav>
  );
};

export default Navbar;
