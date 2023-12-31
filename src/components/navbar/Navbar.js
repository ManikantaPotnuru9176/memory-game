import React, { useEffect } from "react";

import Button from "./Button";

import useGameStore from "@/store/gameStore";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../auth/config/firebaseConfig";
import useAuthStore from "@/store/authStore";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const settings = useGameStore((store) => store.settings);
  const pausePlay = useGameStore((store) => store.pausePlay);
  const setPausePlay = useGameStore((store) => store.setPausePlay);
  const toggleTimer = useGameStore((store) => store.toggleTimer);
  const isMobileMenuOpen = useGameStore((store) => store.isMobileMenuOpen);
  const toggleMobileMenu = useGameStore((store) => store.toggleMobileMenu);
  const gameStatus = useGameStore((store) => store.gameStatus);
  const restartGame = useGameStore((store) => store.restartGame);
  const changeSettingsStatus = useGameStore(
    (store) => store.changeSettingsStatus
  );
  const shuffleGridValues = useGameStore((store) => store.shuffleGridValues);

  const setUser = useAuthStore((store) => store.setUser);

  const router = useRouter();

  useEffect(() => {
    if (!gameStatus.isTimerRunning && pausePlay === "Start Game") return;
    setPausePlay(gameStatus.isTimerRunning ? "Pause Game" : "Resume Game");
  }, [gameStatus.isTimerRunning]);

  const shouldRenderPausePlayButton = settings.selectedPlayers === 1;

  const handlePausePlay = () => {
    toggleTimer();
    setPausePlay(
      pausePlay === "Start Game" || pausePlay === "Resume Game"
        ? "Pause Game"
        : "Resume Game"
    );
  };

  const handleRestart = () => {
    restartGame();
    shuffleGridValues();
  };

  const handleNewGame = () => {
    setPausePlay("Start Game");
    restartGame();
    changeSettingsStatus();
    router.push("/game/newgame");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully Signed out", {
        duration: 3000,
        position: "top-right",
      });
      setUser(null);
      localStorage.setItem("user", JSON.stringify(null));
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Error occured. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
      console.log("Error: ", error.message);
    }
  };

  return (
    <>
      <div className="mb-8 px-4 md:px-16 lg:px-12 pt-4 md:pt-6 pb-6 md:pb-0">
        <Toaster />
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#152836]">
            Memory Game
          </h1>
          <nav className="mt-2 md:mt-0">
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="bg-[#fca516] hover:bg-[#fcba4f] text-white text-md font-bold px-4 py-2 rounded-full"
              >
                Menu
              </button>
            </div>
            <div className="hidden md:flex md:gap-2 lg:gap-4">
              <Button text="Restart" primary onClick={() => handleRestart()} />
              <Button text="New Game" onClick={() => handleNewGame()} />
              {shouldRenderPausePlayButton && (
                <Button text={pausePlay} onClick={handlePausePlay} />
              )}
              <Button text="Sign out" onClick={() => handleSignOut()} />
            </div>
          </nav>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 grid place-items-center bg-gray-800 bg-opacity-50 z-50"
          onClick={toggleMobileMenu}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Game Menu"
            className="z-50 w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl rounded-md flex flex-col gap-4 px-4 sm:px-6 md:px-8 xl:px-10 py-6 sm:py-8 md:py-10 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              text="Restart"
              onClick={() => {
                handleRestart();
                toggleMobileMenu();
              }}
              primary
            />
            <Button
              text="New Game"
              onClick={() => {
                handleNewGame();
                toggleMobileMenu();
              }}
            />
            {shouldRenderPausePlayButton && (
              <Button
                text={pausePlay}
                onClick={() => {
                  handlePausePlay();
                  toggleMobileMenu();
                }}
              />
            )}
            <Button text="Sign out" onClick={() => handleSignOut()} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
