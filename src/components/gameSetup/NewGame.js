import React, { useEffect, useState } from "react";

import FormField from "./FormField";

import useGameStore from "@/store/gameStore";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";
import toast, { Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../auth/config/firebaseConfig";

import { getGameSettings, saveSettingsInHasura } from "@/helpers/helpers";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const NewGame = () => {
  const [show, setShow] = useState(false);

  const settings = useGameStore((store) => store.settings);
  const changeOptions = useGameStore((store) => store.changeOptions);
  const shuffleGridValues = useGameStore((store) => store.shuffleGridValues);
  const setSettings = useGameStore((store) => store.setSettings);

  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);
  const rememberSettings = useAuthStore((store) => store.rememberSettings);
  const setRememberSettings = useAuthStore(
    (store) => store.setRememberSettings
  );
  const buttonLoading = useAuthStore((store) => store.buttonLoading);
  const setButtonLoading = useAuthStore((store) => store.setButtonLoading);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const rememberSettings = JSON.parse(
      localStorage.getItem("rememberSettings")
    );
    if (user && rememberSettings) {
      setRememberSettings(settings);
      getGameSettings(user, setSettings).then(() => setShow(true));
    } else setShow(true);
  }, []);

  const options = {
    themeOptions: ["Numbers", "Icons"],
    playerOptions: [1, 2, 3, 4],
    gridSizeOptions: ["4x4", "6x6"],
  };

  const handleRememberSettings = () => {
    setRememberSettings(!rememberSettings);
    localStorage.setItem("rememberSettings", JSON.stringify(!rememberSettings));
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    shuffleGridValues();
    if (rememberSettings)
      saveSettingsInHasura(user, settings).then(() => {
        user ? router.push("/game/game") : router.push("/auth/signin");
        setButtonLoading(false);
      });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully Signed out", {
        duration: 3000,
        position: "bottom-right",
      });
      setUser(null);
      localStorage.setItem("user", JSON.stringify(null));
      router.push("/game/newgame");
    } catch (error) {
      toast.error("Error occured. Please try again.", {
        duration: 3000,
        position: "bottom-right",
      });
      console.log("Error: ", error.message);
    }
  };

  if (!show) return <Loading />;

  return (
    <div
      className={`fixed inset-0 bg-[#142838] transform ${
        show ? "translate-x-0" : "translate-x-full"
      } transition-transform ease-in-out duration-500`}
    >
      <Toaster />
      <div className="absolute right-1 md:right-12 top-2 md:top-4 flex space-x-1 md:space-x-4">
        {user ? (
          <button
            className="text-lg md:text-xl font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-full bg-[#fca516] hover:bg-[#fcba4f] text-white"
            onClick={() => handleSignOut()}
          >
            Sign out
          </button>
        ) : (
          <>
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
          </>
        )}
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
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded accent-yellow-500 cursor-pointer"
                  checked={rememberSettings}
                  onChange={handleRememberSettings}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-[#152836]">
                  Remember my game settings.
                </label>
              </div>
            </div>
            <div className="pt-2">
              <button
                className="relative w-full text-4.125 md:text-3xl font-extrabold bg-[#fca417] hover:bg-[#fcba4f] focus-visible:bg-yellow-900 text-white leading-[2.7] md:leading-[2.187] rounded-full"
                onClick={(e) => handleStartGame(e)}
              >
                {buttonLoading && (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin h-5 w-5 mb-1 left-2"
                  />
                )}
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
