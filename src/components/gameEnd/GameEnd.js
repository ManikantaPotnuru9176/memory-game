import React, { useState } from "react";
import Card from "./Card";

const GameEnd = ({
  setNewGame,
  selectedPlayers,
  time,
  moves,
  players,
  setIsTimerRunning,
}) => {
  players.sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...players.map((player) => player.score));
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const playersDetails =
    selectedPlayers === 1
      ? {
          title: "You did it!",
          subtitle: "Game over! Here's how you got on...",
          data: [
            {
              win: false,
              title: "Time Elapsed",
              result: `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`,
              bgColor: "#dee6ec",
              titleColor: "#819cae",
              resultColor: "#31485b",
            },
            {
              win: false,
              title: "Moves Taken",
              result: moves,
              bgColor: "#dee6ec",
              titleColor: "#819cae",
              resultColor: "#31485b",
            },
          ],
        }
      : {
          title: `Player ${players[0].id} Wins!`,
          subtitle: "Game over! Here are the results...",
          data: players.map((player) => ({
            win: player.score === maxScore,
            title: "Player 1",
            result: player.score,
            bgColor: player.score === maxScore ? "#142936" : "#dee6ec",
            titleColor: player.score === maxScore ? "#ffffff" : "#819cae",
            resultColor: player.score === maxScore ? "#ffffff" : "#31485b",
          })),
        };
  setIsTimerRunning(false);

  const handleRestart = () => {
    shuffleGridValues();
    setMoves(0);
    setTime(0);
    setFlippedCount(0);
    setIsTimerRunning(false);
    setFlippedValues([]);
  };

  return (
    <div>
      {false ? (
        <Card
          details={playersDetails}
          setNewGame={setNewGame}
          handleRestart={handleRestart}
        />
      ) : (
        <Card
          details={playersDetails}
          setNewGame={setNewGame}
          handleRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default GameEnd;
