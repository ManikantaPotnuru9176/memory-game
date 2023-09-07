import React from "react";

const Button = ({ text, onClick, primary }) => (
  <button
    onClick={onClick}
    className={`text-lg md:text-xl font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-full ${
      primary
        ? "bg-[#fca516] hover:bg-[#fcba4f] text-white"
        : "bg-[#dfe7ec] hover:bg-[#6393b6] text-[#32485a] hover:text-white"
    }`}
  >
    {text}
  </button>
);

export default Button;
