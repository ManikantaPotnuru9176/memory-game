import React, { useState } from "react";
import GridItem from "./GridItem";

const Grid = () => {
  const [gridSize, setGridSize] = useState(6);
  const initialRotationState = Array(gridSize * gridSize).fill({
    value: 1,
    status: false,
  });
  const [isRotated, setIsRotated] = useState(initialRotationState);

  const handleRotation = (index) => {
    setIsRotated((prevState) => {
      const newRotationState = [...prevState];
      newRotationState[index] = {
        value: newRotationState[index].value,
        status: !newRotationState[index].status,
      };
      return newRotationState;
    });
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
