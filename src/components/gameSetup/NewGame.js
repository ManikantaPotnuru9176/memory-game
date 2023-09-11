import React, { useEffect, useState } from "react";
import FormField from "./FormField";

const NewGame = ({ settings, setSettings }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleOptionChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    console.log(settings);
  };

  const options = {
    themeOptions: ["Numbers", "Icons"],
    playerOptions: [1, 2, 3, 4],
    gridSizeOptions: ["4x4", "6x6"],
  };

  return (
    <div
      className={`${
        settings.status ? "block" : "hidden"
      } z-50 fixed inset-0 bg-[#142838] transform transition-transform ease-in-out duration-500 ${
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
            <FormField
              legend="Select Theme"
              options={options.themeOptions}
              selectedValue={settings.selectedTheme}
              onChange={(theme) => handleOptionChange("selectedTheme", theme)}
            />
            <FormField
              legend="Numbers of Players"
              options={options.playerOptions}
              selectedValue={settings.selectedPlayers}
              onChange={(players) =>
                handleOptionChange("selectedPlayers", players)
              }
            />
            <FormField
              legend="Grid Size"
              options={options.gridSizeOptions}
              selectedValue={settings.selectedGridSize}
              onChange={(size) => handleOptionChange("selectedGridSize", size)}
            />
            <div className="pt-2">
              <button
                className="w-full text-4.125 md:text-3xl font-extrabold bg-[#fca417] hover:bg-[#fcba4f] focus-visible:bg-yellow-900 text-white leading-[2.7] md:leading-[2.187] rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSettings((prev) => ({ ...prev, status: false }));
                }}
              >
                Start Game
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
