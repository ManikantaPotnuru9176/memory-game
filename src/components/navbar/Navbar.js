import React, { useState } from "react";
import Button from "./Button";

const Navbar = ({ setNewGame }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pausePlay, setPausePlay] = useState("Play Game");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="mb-8 px-4 md:px-16 lg:px-12 pt-4 md:pt-6 pb-6 md:pb-0">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#152836]">
            Memory Game
          </h1>
          <nav className="mt-2 md:mt-0">
            <div className="md:hidden">
              <button
                onClick={() => toggleMobileMenu()}
                className="bg-[#fca516] hover:bg-[#fcba4f] text-white text-md font-bold px-4 py-2 rounded-full"
              >
                Menu
              </button>
            </div>
            <div className="hidden md:flex md:gap-2 lg:gap-4">
              <Button text="Restart" primary />
              <Button text="New Game" onClick={() => setNewGame(true)} />
              <Button
                text={pausePlay}
                onClick={() =>
                  setPausePlay((prev) =>
                    prev === "Play Game" ? "Pause Game" : "Play Game"
                  )
                }
              />
            </div>
          </nav>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 grid place-items-center bg-gray-800 bg-opacity-50 z-50"
          onClick={() => toggleMobileMenu()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Game Menu"
            className="z-50 w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl rounded-md flex flex-col gap-4 px-4 sm:px-6 md:px-8 xl:px-10 py-6 sm:py-8 md:py-10 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button text="Restart" onClick={() => toggleMobileMenu()} primary />
            <Button
              text="New Game"
              onClick={() => {
                toggleMobileMenu();
                setNewGame(true);
              }}
            />
            <Button
              text={pausePlay}
              onClick={() => {
                toggleMobileMenu();
                setPausePlay((prev) =>
                  prev === "Play Game" ? "Pause Game" : "Play Game"
                );
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
