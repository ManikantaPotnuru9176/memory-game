import React from "react";

const GridItem = ({ rotated, handleRotation, index }) => {
  return (
    <div
      className={`relative w-24 h-24 rounded-full text-white overflow-hidden cursor-pointer transition-all duration-700 ${
        rotated.status ? "[transform:rotateY(180deg)]" : ""
      }`}
      onClick={() => handleRotation(index)}
    >
      <div
        className={`absolute inset-0 w-full h-full flex justify-center items-center bg-[#152937] transition-all duration-100 delay-200 z-20 ${
          rotated.status ? "opacity-0" : ""
        }`}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full flex justify-center items-center bg-[#bbcdd8] text-2xl md:text-3xl lg:text-4xl font-extrabold transition-all z-10 [transform:rotateY(180deg)]`}
      >
        {rotated.value}
      </div>
    </div>
  );
};

export default GridItem;
