import React, { Fragment } from "react";

const FormField = ({ legend, options, selectedValue, onChange }) => {
  return (
    <fieldset className="flex flex-col">
      <legend className="text-[#819cae] text-lg md:text-xl font-bold">
        {legend}
      </legend>
      <div className="pt-3 md:pt-4 flex gap-3 md:gap-[1.875rem] md:text-[1.625rem]">
        {options.map((option) => (
          <Fragment key={option}>
            <input
              className="sr-only"
              type="radio"
              name={`mg-${option}`}
              id={`mg-${option}`}
              checked={selectedValue === option}
              onChange={() => onChange(option)}
            />
            <label
              className={`basis-full select-none font-bold cursor-pointer text-white rounded-full text-center leading-[2.5] md:leading-[2] ring-transparent ring-0 ring-offset-2 ${
                selectedValue === option
                  ? "bg-[#152836]"
                  : "bg-[#bacdd9] hover:bg-[#6393b6]"
              }`}
              htmlFor={`mg-${option}`}
            >
              {option}
            </label>
          </Fragment>
        ))}
      </div>
    </fieldset>
  );
};

export default FormField;
