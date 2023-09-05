import React from "react";
import Player from "./Player";

const Players = () => {
  const players = Array(4).fill(1);

  return (
    <div className="flex flex-row justify-around lg:justify-center items-center gap-6 px-6">
      {players.map((_, index) => (
        <Player index={index} />
      ))}
    </div>
  );
};

export default Players;
