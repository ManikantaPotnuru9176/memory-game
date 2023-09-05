import React from "react";

const GridItem = ({ rotated, handleRotation, index }) => {
  return (
    <button
      className={`relative w-[68px] md:w-28 h-[68px] md:h-28 rounded-full text-white overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 ${
        rotated.status ? "[transform:rotateY(180deg)]" : ""
      }`}
      onClick={() => handleRotation(index)}
    >
      <div
        className={`absolute inset-0 w-full h-full flex justify-center items-center bg-[#152937] hover:bg-[#6393b6] transition-all duration-100 z-20 ${
          rotated.status ? "duration-300 opacity-0" : ""
        }`}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full flex justify-center items-center bg-[#bbcdd8] text-2xl md:text-3xl lg:text-4xl font-extrabold transition-all z-10 ${
          rotated.status ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {rotated.value}
      </div>
    </button>
  );
};

export default GridItem;
