import React, { useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pausePlay, setPausePlay] = useState("Play Game");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="mb-6 md:mb-20 px-4 md:px-16 lg:px-40 pt-4 md:pt-12 lg:pt-20">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#152836]">
            Memory
          </h1>
          <nav className="mt-4 md:mt-0">
            <div className="md:hidden">
              <button
                onClick={() => toggleMobileMenu()}
                className="bg-[#fca516] hover:bg-[#fcba4f] text-white text-lg md:text-xl font-bold px-4 md:px-6 py-2 rounded-full"
              >
                Menu
              </button>
            </div>
            <div className="hidden md:flex md:gap-4">
              <Button text="Restart" primary />
              <Button text="New Game" />
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
            className="z-50 w-11/12 bg-white text-4.125 rounded-md flex flex-col gap-4 px-6 py-10 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Button text="Restart" onClick={() => toggleMobileMenu()} primary />
            <Button text="New Game" onClick={() => toggleMobileMenu()} />
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
