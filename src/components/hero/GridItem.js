import React from "react";

const GridItem = ({ rotated, handleRotation, index, gridSize }) => {
  const itemSizeClass =
    gridSize === 6
      ? "w-[3.2rem] h-[3.2rem] md:w-[4.2rem] md:h-[4.2rem]"
      : "w-16 h-16 md:w-24 md:h-24";

  return (
    <button
      className={`relative ${itemSizeClass} rounded-full text-white overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 ${
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
        className={`absolute inset-0 w-full h-full flex justify-center items-center bg-[#bbcdd8] text-lg md:text-3xl font-extrabold transition-all z-10 ${
          rotated.status ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {rotated.value}
      </div>
    </button>
  );
};

export default GridItem;
