import React from "react";
import Time from "./Time";
import Moves from "./Moves";

const GameStatus = () => {
  return (
    <div className="flex flex-row justify-center gap-4 md:gap-8">
      <Time />
      <Moves />
    </div>
  );
};

export default GameStatus;
