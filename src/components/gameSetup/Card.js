import React from "react";

const Card = ({
  setNewGame,
  selectedTheme,
  setSelectedTheme,
  selectedPlayers,
  setSelectedPlayers,
  selectedGridSize,
  setSelectedGridSize,
}) => {
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handlePlayersChange = (players) => {
    setSelectedPlayers(players);
  };

  const handleGridSizeChange = (size) => {
    setSelectedGridSize(size);
  };

  const themeOptions = [
    { label: "Numbers", value: "Numbers" },
    { label: "Icons", value: "Icons" },
  ];

  const playerOptions = [1, 2, 3, 4];

  const gridSizeOptions = ["4x4", "6x6"];

  const renderOptions = (options, selectedValue, onChange) =>
    options.map((option) => (
      <React.Fragment key={option}>
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
          {option.label || option}
        </label>
      </React.Fragment>
    ));

  return (
    <div className="fixed inset-0 bg-[#142838]">
      <div
        className="px-6 mt-20"
        role="dialog"
        aria-modal="true"
        aria-label="Memory Game Setup"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center pb-10">
          Memory
        </h1>
        <div className="bg-white p-6 md:p-14 rounded-lg md:rounded-xl lg:rounded-2xl max-w-[40.875rem] mx-auto">
          <form className="flex flex-col gap-6">
            <div tabIndex="0" className="absolute" aria-hidden="true"></div>
            <fieldset className="flex flex-col">
              <legend className="text-[#819cae] text-lg md:text-xl font-bold">
                Select Theme
              </legend>
              <div className="pt-3 md:pt-4 flex gap-3 md:gap-[1.875rem] md:text-[1.625rem]">
                {renderOptions(themeOptions, selectedTheme, handleThemeChange)}
              </div>
            </fieldset>
            <fieldset className="flex flex-col">
              <legend className="text-[#819cae] text-lg md:text-xl font-bold">
                Numbers of Players
              </legend>
              <div className="pt-3 md:pt-4 flex gap-3 md:gap-[1.875rem] md:text-[1.625rem]">
                {renderOptions(
                  playerOptions,
                  selectedPlayers,
                  handlePlayersChange
                )}
              </div>
            </fieldset>
            <fieldset className="flex flex-col">
              <legend className="text-[#819cae] text-lg md:text-xl font-bold">
                Grid Size
              </legend>
              <div className="pt-3 md:pt-4 flex gap-3 md:gap-[1.875rem] md:text-[1.625rem]">
                {renderOptions(
                  gridSizeOptions,
                  selectedGridSize,
                  handleGridSizeChange
                )}
              </div>
            </fieldset>
            <div className="pt-2">
              <button
                className="w-full text-4.125 md:text-3xl font-extrabold bg-[#fca417] hover:bg-[#fcba4f] focus-visible:bg-yellow-900 text-white leading-[2.7] md:leading-[2.187] rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  setNewGame(false);
                }}
              >
                Start Game
              </button>
              <div tabIndex="0" className="absolute" aria-hidden="true"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
