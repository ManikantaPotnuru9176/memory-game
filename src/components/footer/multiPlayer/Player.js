import React from "react";

const Player = ({ index }) => {
  return (
    <div className="w-full md:w-[260px] bg-[#dfe7ec] rounded-lg">
      <div className="flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-center h-full md:px-4 lg:px-6 py-3 md:py-2 lg:py-5">
        <span className="text-[#819cae] text-md md:text-md lg:text-xl font-bold">
          <span className="hidden md:inline">Player {index + 1}</span>
          <span className="md:hidden">P{index + 1}</span>
        </span>
        <span className="text-[#31485b] text-2xl lg:text-3xl font-bold">
          0
        </span>
      </div>
    </div>
  );
};

export default Player;
