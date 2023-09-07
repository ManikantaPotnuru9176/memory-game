import React from "react";

const Time = () => {
  return (
    <div className="w-[150px] md:w-[260px] h-[80px] md:h-[68px] bg-[#dfe7ec] rounded-lg">
      <div className="px-5 pt-2 md:pt-4 flex flex-col md:flex-row md:justify-between items-center gap-1">
        <span className="text-[#819cae] text-xl md:text-2xl font-extrabold">
          Time
        </span>
        <span className="text-[#31485b] text-2xl md:text-3xl font-bold">
          0:00
        </span>
      </div>
    </div>
  );
};

export default Time;
