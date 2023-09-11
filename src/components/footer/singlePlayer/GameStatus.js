import React from "react";
import Time from "./Time";
import Moves from "./Moves";

const GameStatus = ({
  gameStatus,
  setGameStatus,

  isTimerRunning,
  moves,
  time,
  setTime,
}) => {
  return (
    <div className="flex flex-row justify-center gap-6">
      <Time gameStatus={gameStatus} setGameStatus={setGameStatus} />
      <Moves gameStatus={gameStatus} />
    </div>
  );
};

export default GameStatus;
