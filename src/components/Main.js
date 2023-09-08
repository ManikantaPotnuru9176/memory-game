import Navbar from "@/components/navbar/Navbar";
import Grid from "@/components/hero/Grid";
import Footer from "@/components/footer/Footer";
import NewGame from "@/components/gameSetup/NewGame";
import GameEnd from "@/components/gameEnd/GameEnd";
import { useEffect, useState } from "react";

const Main = () => {
  const [newGame, setNewGame] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState("Numbers");
  const [selectedPlayers, setSelectedPlayers] = useState(1);
  const [selectedGridSize, setSelectedGridSize] = useState("4x4");

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  const [gridValues, setGridValues] = useState([]);
  const [flippedValues, setFlippedValues] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [gridSize, setGridSize] = useState(4);

  useEffect(() => {
    console.log("first");
    setGridSize(selectedGridSize === "4x4" ? 4 : 6);
  }, [selectedGridSize]);

  const shuffleGridValues = () => {
    const pairs = Array.from(
      { length: (gridSize * gridSize) / 2 },
      (_, index) => index + 1
    );
    const shuffledPairs = [...pairs, ...pairs].sort(() => Math.random() - 0.5);

    const initialRotationState = shuffledPairs.map((value) => ({
      value,
      bgColor: "bg-[#bbcdd8]",
      status: false,
    }));

    setGridValues(initialRotationState);
  };

  return (
    <>
      {!newGame ? (
        <>
          <Navbar
            setNewGame={setNewGame}
            selectedPlayers={selectedPlayers}
            setIsTimerRunning={setIsTimerRunning}
            isTimerRunning={isTimerRunning}
            setMoves={setMoves}
            setTime={setTime}
            setFlippedValues={setFlippedValues}
            setFlippedCount={setFlippedCount}
            shuffleGridValues={shuffleGridValues}
          />
          <div className="lg:container mx-auto px-4">
            <Grid
              gridSize={gridSize}
              selectedGridSize={selectedGridSize}
              setIsTimerRunning={setIsTimerRunning}
              setMoves={setMoves}
              gridValues={gridValues}
              setGridValues={setGridValues}
              flippedValues={flippedValues}
              setFlippedValues={setFlippedValues}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              shuffleGridValues={shuffleGridValues}
            />
          </div>
          <Footer
            selectedPlayers={selectedPlayers}
            isTimerRunning={isTimerRunning}
            moves={moves}
            time={time}
            setTime={setTime}
          />
          {false && <GameEnd setNewGame={setNewGame} />}
        </>
      ) : (
        <NewGame
          setNewGame={setNewGame}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          selectedGridSize={selectedGridSize}
          setSelectedGridSize={setSelectedGridSize}
        />
      )}
    </>
  );
};

export default Main;
