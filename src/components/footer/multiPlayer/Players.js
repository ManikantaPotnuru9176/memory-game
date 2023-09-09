import React from "react";
import Player from "./Player";

const Players = ({ currPlayer, players }) => {
  return (
    <div className="flex flex-row justify-center gap-3 md:gap-6 px-5">
      {players.map((player) => (
        <Player
          key={player.id}
          playerIndex={player.id}
          currPlayer={currPlayer}
          playerScore={player.score}
        />
      ))}
    </div>
  );
};

export default Players;
