import React from "react";
import Time from "./Time";
import Moves from "./Moves";

const GameStatus = ({ isTimerRunning, moves, time, setTime }) => {
  return (
    <div className="flex flex-row justify-center gap-6">
      <Time isTimerRunning={isTimerRunning} time={time} setTime={setTime} />
      <Moves moves={moves} />
    </div>
  );
};

export default GameStatus;
