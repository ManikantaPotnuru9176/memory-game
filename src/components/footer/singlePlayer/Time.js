import useGameStore from "@/components/gameStore";
import React, { useEffect } from "react";

const Time = () => {
  const gameStatus = useGameStore((store) => store.gameStatus);
  const incTime = useGameStore((store) => store.incTime);

  useEffect(() => {
    let intervalId;
    if (gameStatus.isTimerRunning) {
      intervalId = setInterval(() => {
        incTime();
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [gameStatus.isTimerRunning]);

  const minutes = Math.floor(gameStatus.time / 60);
  const seconds = gameStatus.time % 60;

  return (
    <div className="w-[150px] md:w-[260px] h-[80px] md:h-[68px] bg-[#dfe7ec] rounded-lg">
      <div className="px-5 pt-2 md:pt-4 flex flex-col md:flex-row md:justify-between items-center gap-1">
        <span className="text-[#819cae] text-xl md:text-2xl font-extrabold">
          Time
        </span>
        <span className="text-[#31485b] text-2xl md:text-3xl font-bold">
          {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </span>
      </div>
    </div>
  );
};

export default Time;
