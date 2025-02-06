import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`${className} w-full h-full mx-auto max-w-[1400px] px-4 md:px-6 lg:px-6 2xl:px-0`}>
      {children}
    </div>
  );
};

export default Wrapper;
