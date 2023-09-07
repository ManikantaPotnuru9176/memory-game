import React from "react";
import Player from "./Player";

const Players = ({ selectedPlayers }) => {
  const players = Array.from({ length: selectedPlayers }, (_, index) => index);

  return (
    <div className="flex flex-row justify-center gap-3 md:gap-6 px-5">
      {players.map((playerIndex) => (
        <Player key={playerIndex} index={playerIndex} />
      ))}
    </div>
  );
};

export default Players;
