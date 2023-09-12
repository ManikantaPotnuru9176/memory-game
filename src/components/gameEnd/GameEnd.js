import React, { useState } from "react";
import Card from "./Card";

const GameEnd = ({
  settings,
  setSettings,
  gameStatus,
  playersData,
  setGameStatus,
  handleRestart,
}) => {
  playersData.players.sort((a, b) => b.score - a.score);
  const maxScore = Math.max(
    ...playersData.players.map((player) => player.score)
  );
  const minutes = Math.floor(gameStatus.time / 60);
  const seconds = gameStatus.time % 60;
  const playersDetails =
    settings.selectedPlayers === 1
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
              result: gameStatus.moves,
              bgColor: "#dee6ec",
              titleColor: "#819cae",
              resultColor: "#31485b",
            },
          ],
        }
      : {
          title:
            playersData.players.filter((player) => player.score === maxScore)
              .length === 1
              ? `Player ${playersData.players[0].id} Wins!`
              : "It's a tie!",
          subtitle: "Game over! Here are the results...",
          data: playersData.players.map((player) => ({
            win: player.score === maxScore,
            title: `Player ${player.id}`,
            result: player.score,
            bgColor: player.score === maxScore ? "#142936" : "#dee6ec",
            titleColor: player.score === maxScore ? "#ffffff" : "#819cae",
            resultColor: player.score === maxScore ? "#ffffff" : "#31485b",
          })),
        };
  setGameStatus((prevGameStatus) => ({
    ...prevGameStatus,
    isTimerRunning: false,
  }));

  return (
    <div>
      <Card
        details={playersDetails}
        setSettings={setSettings}
        handleRestart={handleRestart}
      />
    </div>
  );
};

export default GameEnd;
