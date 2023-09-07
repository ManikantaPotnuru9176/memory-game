import React from "react";

const Player = ({ index }) => {
  return (
    <div
      className={`relative w-full md:w-56 ${
        index === 0 ? "bg-[#fca417]" : "bg-[#dfe7ec]"
      } rounded-lg`}
    >
      <div
        className={`${
          index === 0 ? "block" : "hidden"
        } absolute w-[1rem] md:w-[1.5rem] lg:w-[2.0rem] h-[1rem] md:h-[1.5rem] lg:h-[2.0rem] top-0 bg-[#fca417] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 transition-all duration-500 origin-center`}
      ></div>
      <div className="flex flex-col md:flex-row justify-between items-center h-full px-4 md:px-6 py-3 md:py-4 lg:py-5">
        <span
          className={`${
            index === 0 ? "text-white" : "text-[#819cae]"
          } text-base md:text-lg lg:text-xl font-bold`}
        >
          <span className="hidden md:inline">Player {index + 1}</span>
          <span className="md:hidden">P{index + 1}</span>
        </span>
        <span
          className={`${
            index === 0 ? "text-white" : "text-[#31485b]"
          } text-lg lg:text-2xl font-bold`}
        >
          0
        </span>
        {index === 0 && (
          <div className="hidden lg:block absolute top-20 text-[#152937] font-bold text-center uppercase text-xxs tracking-[0.3em] mt-2">
            Current Turn
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
