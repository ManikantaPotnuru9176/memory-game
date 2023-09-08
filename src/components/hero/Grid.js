import React, { useEffect, useRef } from "react";
import GridItem from "./GridItem";

const Grid = ({
  setIsTimerRunning,
  setMoves,
  gridValues,
  setGridValues,
  flippedValues,
  setFlippedValues,
  flippedCount,
  setFlippedCount,
  shuffleGridValues,
  gridSize,
}) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      shuffleGridValues();
    } else {
      if (flippedCount === 2) {
        setTimeout(() => {
          const [firstIndex, secondIndex] = flippedValues;
          const firstValue = gridValues[firstIndex].value;
          const secondValue = gridValues[secondIndex].value;

          const matched = firstValue === secondValue;
          const newGridValues = [...gridValues];

          [firstIndex, secondIndex].forEach((index) => {
            newGridValues[index].status = matched ? true : false;
            newGridValues[index].bgColor = matched
              ? "bg-[#fca516]"
              : "bg-[#bbcdd8]";
          });

          setMoves((prev) => prev + 1);
          setGridValues(newGridValues);
          setFlippedCount(0);
          setFlippedValues([]);
        }, 600);
      }
    }
  }, [flippedCount, flippedValues, gridSize, gridValues]);

  const handleRotation = (index) => {
    if (flippedCount < 2 && !gridValues[index].status) {
      const newGridValues = [...gridValues];
      newGridValues[index].status = true;

      setGridValues(newGridValues);
      setFlippedCount((count) => count + 1);
      setFlippedValues((values) => [...values, index]);
      setIsTimerRunning(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pb-6 md:pb-0">
      <div
        className={`grid ${
          gridSize === 4 ? "grid-cols-4" : "grid-cols-6"
        } gap-2 md:${gridSize === 4 ? "gap-4" : "gap-2"}`}
      >
        {gridValues.map((rotated, index) => (
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
