import React from "react";
import GameStatus from "./singlePlayer/GameStatus";
import Players from "./multiPlayer/Players";

const Footer = ({ selectedPlayers, isTimerRunning, moves }) => {
  return (
    <div className="pt-8 md:pt-12 lg:pt-16">
      {selectedPlayers === 1 ? (
        <GameStatus isTimerRunning={isTimerRunning} moves={moves} />
      ) : (
        <Players selectedPlayers={selectedPlayers} />
      )}
    </div>
  );
};

export default Footer;
