import React from "react";

const Card = ({ details, setNewGame }) => {
  const { title, subtitle, data } = details;

  return (
    <div
      className={`z-50 fixed inset-0 grid place-items-center px-6 pointer-events-auto backdrop-brightness-50`}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[40.875rem] bg-white text-4.125 rounded-lg md:rounded-xl flex flex-col gap-6 md:gap-10 pt-8 md:pt-[3.25rem] px-6 md:px-14 pb-6 md:pb-[4.375rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="text-2xl md:text-4xl font-extrabold text-[#142936] text-center">
            {title}
          </div>
          <div className="text-md md:text-xl font-bold text-[#819cae] text-center leading-[1.2]">
            {subtitle}
          </div>
        </div>
        <dl className="flex flex-col gap-2 md:gap-4">
          {data.map((data, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-4 py-3 md:px-8 md:py-5 rounded-md ${
                data.win ? "bg-[#142936]" : "bg-[#dee6ec]"
              }`}
            >
              <dt
                className={`${
                  data.win ? "text-[#ffffff]" : "text-[#819cae]"
                } text-md md:text-2xl font-bold`}
              >
                {data?.title + (data.win ? " (Winner!)" : "")}
              </dt>
              <dd
                className={`${
                  data.win ? "text-[#ffffff]" : "text-[#31485b]"
                } text-xl md:text-3xl font-bold`}
              >
                {data?.result}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col md:flex-row gap-4 md:gap-[0.875rem] md:pt-4 text-4.125 md:text-5">
          <button className="basis-full text-lg md:text-xl font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-[#fca516] hover:bg-[#fcba4f] text-white">
            Restart
          </button>
          <button
            className="basis-full text-lg md:text-xl font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-[#dfe7ec] hover:bg-[#6393b6] text-[#32485a] hover:text-white"
            onClick={() => setNewGame(true)}
          >
            Setup New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
