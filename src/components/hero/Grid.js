import React, { useEffect, useRef } from "react";
import GridItem from "./GridItem";
import useGameStore from "../gameStore";

const Grid = () => {
  const grid = useGameStore((store) => store.grid);
  const match = useGameStore((store) => store.match);

  useEffect(() => {
    if (grid.flippedCount === 2) {
      setTimeout(() => {
        const [firstIndex, secondIndex] = grid.flippedValues;
        match(firstIndex, secondIndex);
      }, 600);
    }
  }, [grid.flippedCount, grid.flippedValues, grid.gridSize, grid.gridValues]);

  return (
    <div className="flex flex-col justify-center items-center pb-6 md:pb-0">
      <div
        className={`grid ${
          grid.gridSize === 4 ? "grid-cols-4" : "grid-cols-6"
        } gap-2 md:${grid.gridSize === 4 ? "gap-4" : "gap-2"}`}
      >
        {grid.gridValues.map((gridValue, index) => (
          <GridItem key={index} index={index} gridValue={gridValue} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
