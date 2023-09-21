import React, { use, useEffect } from "react";

import FormField from "./FormField";

import useGameStore from "@/store/gameStore";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";

const NewGame = () => {
  const settings = useGameStore((store) => store.settings);
  const changeOptions = useGameStore((store) => store.changeOptions);
  const changeSettingsStatus = useGameStore(
    (store) => store.changeSettingsStatus
  );
  const shuffleGridValues = useGameStore((store) => store.shuffleGridValues);

  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const options = {
    themeOptions: ["Numbers", "Icons"],
    playerOptions: [1, 2, 3, 4],
    gridSizeOptions: ["4x4", "6x6"],
  };

  return (
    <div
      className={`${
        settings.status ? "translate-x-0" : "-translate-x-full"
      } z-50 fixed inset-0 bg-[#142838] transition-transform ease-in-out duration-500 transform`}
    >
      <div className="absolute right-12 top-4 gap-2 flex space-x-4">
        <button
          className="text-lg md:text-xl font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-[#fca516] hover:bg-[#fcba4f] text-white"
          onClick={() => router.push("/auth/signin")}
        >
          Sign in
        </button>
        <button
          className="text-lg md:text-xl font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-[#dfe7ec] hover:bg-[#6393b6] text-[#32485a] hover:text-white"
          onClick={() => router.push("/auth/signup")}
        >
          Sign up
        </button>
      </div>
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
              onChange={(theme) => changeOptions("selectedTheme", theme)}
            />
            <FormField
              legend="Numbers of Players"
              options={options.playerOptions}
              selectedValue={settings.selectedPlayers}
              onChange={(players) => changeOptions("selectedPlayers", players)}
            />
            <FormField
              legend="Grid Size"
              options={options.gridSizeOptions}
              selectedValue={settings.selectedGridSize}
              onChange={(size) => changeOptions("selectedGridSize", size)}
            />
            <div className="pt-2">
              <button
                className="w-full text-4.125 md:text-3xl font-extrabold bg-[#fca417] hover:bg-[#fcba4f] focus-visible:bg-yellow-900 text-white leading-[2.7] md:leading-[2.187] rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  changeSettingsStatus();
                  shuffleGridValues();
                  user
                    ? router.push("/game/game")
                    : router.push("/auth/signin");
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
