import React, { useState, useEffect, useRef } from "react";
import GridItem from "./GridItem";

const Grid = ({ selectedGridSize, setIsTimerRunning }) => {
  const gridSize = selectedGridSize === "4x4" ? 4 : 6;
  const isInitialRender = useRef(true);

  const [gridValues, setGridValues] = useState([]);
  const [flippedValues, setFlippedValues] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;

      const pairs = Array.from(
        { length: (gridSize * gridSize) / 2 },
        (_, index) => index + 1
      );
      const shuffledPairs = [...pairs, ...pairs].sort(
        () => Math.random() - 0.5
      );

      const initialRotationState = shuffledPairs.map((value) => ({
        value,
        bgColor: "#bbcdd8",
        status: false,
      }));

      setGridValues(initialRotationState);
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
            newGridValues[index].bgColor = matched ? "#fca516" : "#bbcdd8";
          });

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
