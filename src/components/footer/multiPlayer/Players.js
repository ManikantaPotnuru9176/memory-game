import React from "react";
import Player from "./Player";
import useGameStore from "@/components/gameStore";

const Players = () => {
  const playersData = useGameStore((store) => store.playersData);
  const currPlayer = useGameStore((store) => store.playersData.currPlayer);

  return (
    <div className="flex flex-row justify-center gap-3 md:gap-6 px-5">
      {playersData.players.map((player) => (
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
