import Navbar from "@/components/navbar/Navbar";
import Grid from "@/components/hero/Grid";
import Footer from "@/components/footer/Footer";
import NewGame from "@/components/gameSetup/NewGame";
import GameEnd from "@/components/gameEnd/GameEnd";
import { useEffect, useState } from "react";

const Main = () => {
  const [settings, setSettings] = useState({
    status: true,
    selectedTheme: "Numbers",
    selectedPlayers: 1,
    selectedGridSize: "4x4",
  });

  const [gameStatus, setGameStatus] = useState({
    isTimerRunning: false,
    moves: 0,
    time: 0,
  });

  const [grid, setGrid] = useState({
    gridValues: [],
    flippedValues: [],
    flippedCount: 0,
  });

  const [playersData, setPlayersData] = useState({
    currPlayer: 1,
    players: Array.from({ length: settings.selectedPlayers }, (_, index) => ({
      id: index + 1,
      score: 0,
    })),
  });

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    setPlayersData((prev) => ({
      ...prev,
      players: Array.from({ length: settings.selectedPlayers }, (_, index) => ({
        id: index + 1,
        score: 0,
      })),
    }));
  }, [settings.selectedPlayers]);

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
      <NewGame settings={settings} setSettings={setSettings} />
      {/* <Navbar />
      <div className="lg:container mx-auto px-4">
            <Grid />
          </div>
          <Footer />
          {totalScore * 2 === gridSize * gridSize && <GameEnd />} */}
    </>
  );
};

export default Main;
