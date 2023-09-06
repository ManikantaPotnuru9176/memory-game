import React from "react";
import Player from "./Player";

const Players = () => {
  const players = Array(4).fill(1);

  return (
    <div className="flex flex-row justify-center gap-3 md:gap-6 px-5">
      {players.map((_, index) => (
        <Player key={index} index={index} />
      ))}
    </div>
  );
};

export default Players;
