import React, { useState } from "react";
import Card from "./Card";

const GameEnd = ({ setNewGame }) => {
  const [playerDetails, setPlayerDetails] = useState({
    title: "You did it!",
    subtitle: "Game over! Here's how you got on...",
    data: [
      {
        win: false,
        title: "Time Elapsed",
        result: "0:23",
        bgColor: "#dee6ec",
        titleColor: "#819cae",
        resultColor: "#31485b",
      },
      {
        win: false,
        title: "Moves Taken",
        result: "15",
        bgColor: "#dee6ec",
        titleColor: "#819cae",
        resultColor: "#31485b",
      },
    ],
  });

  const [playersDetails, setPlayersDetails] = useState({
    title: "Player 1 Wins!",
    subtitle: "Game over! Here are the results...",
    data: [
      {
        win: true,
        title: "Player 1",
        result: "7 Pairs",
        bgColor: "#142936",
        titleColor: "#ffffff",
        resultColor: "#ffffff",
      },
      {
        win: false,
        title: "Player 2",
        result: "1 Pair",
        bgColor: "#dee6ec",
        titleColor: "#819cae",
        resultColor: "#31485b",
      },
    ],
  });

  return (
    <div>
      {false ? (
        <Card details={playerDetails} setNewGame={setNewGame} />
      ) : (
        <Card details={playersDetails} setNewGame={setNewGame} />
      )}
    </div>
  );
};

export default GameEnd;
