import React from "react";
import GameStatus from "./singlePlayer/GameStatus";
import Players from "./multiPlayer/Players";

const Footer = ({
  settings,
  gameStatus,
  setGameStatus,
  playersData,
}) => {
  return (
    <div className="pt-8 md:pt-12 lg:pt-16">
      {settings.selectedPlayers === 1 ? (
        <GameStatus gameStatus={gameStatus} setGameStatus={setGameStatus} />
      ) : (
        <Players playersData={playersData} />
      )}
    </div>
  );
};

export default Footer;
