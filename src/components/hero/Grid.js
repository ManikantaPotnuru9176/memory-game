import React, { useEffect, useRef } from "react";
import GridItem from "./GridItem";

const Grid = ({
  settings,
  grid,
  setGrid,
  setGameStatus,
  setTotalScore,
  setPlayersData,
  shuffleGridValues,
  playersData,
}) => {
  const isInitialRender = useRef(true);
  const gridSize = settings.selectedGridSize === "4x4" ? 4 : 6;

  const handleMatch = (firstIndex, secondIndex) => {
    const { gridValues } = grid;
    const firstValue = gridValues[firstIndex].value;
    const secondValue = gridValues[secondIndex].value;

    const matched = firstValue === secondValue;
    const newGridValues = gridValues.map((gridValue, index) => {
      if (index === firstIndex || index === secondIndex) {
        return {
          ...gridValue,
          status: matched,
          bgColor: matched ? "bg-[#fca516]" : "bg-[#bbcdd8]",
        };
      }
      return gridValue;
    });

    if (matched) {
      setTotalScore((prev) => prev + 1);
      setPlayersData((prevPlayer) => ({
        ...prevPlayer,
        players: prevPlayer.players.map((player) =>
          player.id === playersData.currPlayer
            ? { ...player, score: player.score + 1 }
            : player
        ),
      }));
    }

    if (settings.selectedPlayers === 1) {
      setGameStatus((prevGame) => ({
        ...prevGame,
        moves: prevGame.moves + 1,
      }));
    } else {
      setPlayersData((prevPlayers) => ({
        ...prevPlayers,
        currPlayer:
          prevPlayers.currPlayer === settings.selectedPlayers
            ? 1
            : prevPlayers.currPlayer + 1,
      }));
    }

    setGrid((prevGrid) => ({
      ...prevGrid,
      gridValues: newGridValues,
      flippedValues: [],
      flippedCount: 0,
    }));
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      shuffleGridValues();
    } else if (grid.flippedCount === 2) {
      setTimeout(() => {
        const [firstIndex, secondIndex] = grid.flippedValues;
        handleMatch(firstIndex, secondIndex);
      }, 600);
    }
  }, [grid.flippedCount, grid.flippedValues, gridSize, grid.gridValues]);

  const handleRotation = (index) => {
    if (grid.flippedCount < 2 && !grid.gridValues[index].status) {
      const newGridValues = grid.gridValues.map((gridValue, i) => {
        if (i === index) {
          return { ...gridValue, status: true };
        }
        return gridValue;
      });

      setGrid((prevGrid) => ({
        ...prevGrid,
        gridValues: newGridValues,
        flippedValues: [...prevGrid.flippedValues, index],
        flippedCount: prevGrid.flippedCount + 1,
      }));
      setGameStatus((prevGame) => ({ ...prevGame, isTimerRunning: true }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pb-6 md:pb-0">
      <div
        className={`grid ${
          gridSize === 4 ? "grid-cols-4" : "grid-cols-6"
        } gap-2 md:${gridSize === 4 ? "gap-4" : "gap-2"}`}
      >
        {grid.gridValues.map((rotated, index) => (
          <GridItem
            key={index}
            rotated={rotated}
            handleRotation={handleRotation}
            index={index}
            gridSize={gridSize}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
