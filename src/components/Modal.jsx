import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000a6]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
          onClick={onClose}>
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
