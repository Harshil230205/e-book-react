import React from "react";

const SubscribeSection = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-8">
          Subscribe to our newsletter for new book alerts and reading
          recommendations
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-6 py-3 rounded-lg border focus:outline-none bg-white pl-3"
          />
          <button className="w-full sm:w-auto px-8 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
