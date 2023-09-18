import React from "react";

import useGameStore from "@/store/gameStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GridItem = ({ gridValue, index }) => {
  const rotate = useGameStore((store) => store.rotate);
  const settings = useGameStore((store) => store.settings);
  const grid = useGameStore((store) => store.grid);

  const itemSizeClass =
    grid.gridSize === 6
      ? "w-[3.2rem] h-[3.2rem] md:w-[4.5rem] md:h-[4.5rem]"
      : "w-16 h-16 md:w-24 md:h-24";

  return (
    <button
      className={`relative ${itemSizeClass} rounded-full text-white overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 ${
        gridValue.status ? "[transform:rotateY(180deg)]" : ""
      }`}
      onClick={() => rotate(index)}
    >
      <div
        className={`absolute inset-0 w-full h-full flex justify-center items-center bg-[#152937] hover:bg-[#6393b6] transition-all duration-100 z-20 ${
          gridValue.status ? "duration-300 opacity-0" : ""
        }`}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full flex justify-center items-center ${
          gridValue.bgColor === "bg-[#bbcdd8]" ? "bg-[#bbcdd8]" : "bg-[#fca516]"
        } text-2xl md:text-4xl font-extrabold transition-all z-10 ${
          gridValue.status ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {settings?.selectedTheme === "Numbers" ? (
          gridValue.value
        ) : (
          <FontAwesomeIcon color="white" icon={gridValue.value} size="lg" />
        )}
      </div>
    </button>
  );
};

export default GridItem;
