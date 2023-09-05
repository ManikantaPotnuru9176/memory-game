import React from "react";

const Time = () => {
  return (
    <div className="w-[150px] md:w-[260px] h-[100px] md:h-[68px] bg-[#dfe7ec] px-5 py-5 flex flex-col md:flex-row justify-between items-center rounded-lg gap-2">
      <span className="text-[#819cae] text-xl md:text-2xl font-extrabold">
        Time
      </span>
      <span className="text-[#31485b] text-2xl md:text-3xl font-bold">
        0:00
      </span>
    </div>
  );
};

export default Time;
