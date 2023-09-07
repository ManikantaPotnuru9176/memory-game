import React, { useState, useEffect } from "react";
import GridItem from "./GridItem";

const Grid = ({ selectedGridSize }) => {
  const gridSize = selectedGridSize === "4x4" ? 4 : 6;

  const initialRotationState = Array(gridSize * gridSize).fill({
    value: 1,
    status: false,
  });

  const [isRotated, setIsRotated] = useState(initialRotationState);
  const [flippedCount, setFlippedCount] = useState(0);

  useEffect(() => {
    if (flippedCount === 2) {
      setTimeout(() => {
        const newRotationState = isRotated.map((rotated) => ({
          value: rotated.value,
          status: false,
        }));
        setIsRotated(newRotationState);
        setFlippedCount(0);
      }, 600);
    }
  }, [flippedCount, isRotated]);

  const handleRotation = (index) => {
    if (flippedCount < 2 && !isRotated[index].status) {
      setIsRotated((prevState) => {
        const newRotationState = [...prevState];
        newRotationState[index] = {
          value: newRotationState[index].value,
          status: !newRotationState[index].status,
        };
        return newRotationState;
      });
      setFlippedCount((count) => count + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pb-6 md:pb-0">
      <div
        className={`grid ${
          gridSize === 4 ? "grid-cols-4" : "grid-cols-6"
        } gap-2 md:${gridSize === 4 ? "gap-4" : "gap-2"}`}
      >
        {isRotated.map((rotated, index) => (
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
