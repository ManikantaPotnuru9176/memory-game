import React, { useState } from "react";
import GridItem from "./GridItem";

const Grid = () => {
  const initialRotationState = Array(16).fill({ value: 1, status: false });
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
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-4 gap-4">
        {isRotated.map((rotated, index) => (
          <GridItem
            key={index}
            rotated={rotated}
            handleRotation={handleRotation}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
