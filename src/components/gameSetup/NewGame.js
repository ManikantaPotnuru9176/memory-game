import React from "react";
import Card from "./Card";

const NewGame = ({
  setNewGame,
  selectedTheme,
  setSelectedTheme,
  selectedPlayers,
  setSelectedPlayers,
  selectedGridSize,
  setSelectedGridSize,
}) => {
  return (
    <div>
      <Card
        setNewGame={setNewGame}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
        selectedGridSize={selectedGridSize}
        setSelectedGridSize={setSelectedGridSize}
      />
    </div>
  );
};

export default NewGame;
