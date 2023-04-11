import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="relative">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-black-400"></div>
        <div className="absolute top-0 right-0 h-full w-1/2 bg-grey-500"></div>
        <div className="relative z-10 flex justify-center items-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
