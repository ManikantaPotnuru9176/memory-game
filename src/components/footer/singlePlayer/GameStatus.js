import React from "react";
import Time from "./Time";
import Moves from "./Moves";

const GameStatus = ({ isTimerRunning }) => {
  return (
    <div className="flex flex-row justify-center gap-6">
      <Time isTimerRunning={isTimerRunning} />
      <Moves />
    </div>
  );
};

export default GameStatus;
