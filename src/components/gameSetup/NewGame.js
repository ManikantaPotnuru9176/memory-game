import React, { useEffect, useState } from "react";
import Option from "./Option";

const NewGame = ({
  setNewGame,
  selectedTheme,
  setSelectedTheme,
  selectedPlayers,
  setSelectedPlayers,
  selectedGridSize,
  setSelectedGridSize,
  setMoves,
  setTime,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const handlePlayersChange = (players) => {
    setSelectedPlayers(players);
  };

  const handleGridSizeChange = (size) => {
    setSelectedGridSize(size);
  };

  const themeOptions = ["Numbers", "Icons"];

  const playerOptions = [1, 2, 3, 4];

  const gridSizeOptions = ["4x4", "6x6"];

  const renderOptions = (options, selectedValue, onChange) =>
    options.map((option) => (
      <Option
        key={option}
        options={options}
        option={option}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    ));

  return (
    <div
      className={`fixed inset-0 bg-[#142838] transform transition-transform ease-in-out duration-500 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className="px-6 mt-20"
        role="dialog"
        aria-modal="true"
        aria-label="Memory Game Setup"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center pb-10">
          Memory Game
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
                  setMoves(0);
                  setTime(0);
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

export default NewGame;
