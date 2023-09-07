import React from "react";

const Option = ({ options, option, selectedValue, onChange }) => {
  return (
    <React.Fragment>
      <input
        className="sr-only"
        type="radio"
        name={`mg-${options[0]}-${option}`}
        id={`mg-${options[0]}-${option}`}
        checked={selectedValue === option}
        onChange={() => onChange(option)}
      />
      <label
        className={`basis-full select-none font-bold cursor-pointer text-white rounded-full text-center leading-[2.5] md:leading-[2] ring-transparent ring-0 ring-offset-2 ${
          selectedValue === option
            ? "bg-[#152836]"
            : "bg-[#bacdd9] hover:bg-[#6393b6]"
        }`}
        htmlFor={`mg-${options[0]}-${option}`}
      >
        {option}
      </label>
    </React.Fragment>
  );
};

export default Option;
