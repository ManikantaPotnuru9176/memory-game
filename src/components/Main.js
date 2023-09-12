import Navbar from "@/components/navbar/Navbar";
import Grid from "@/components/hero/Grid";
import Footer from "@/components/footer/Footer";
import NewGame from "@/components/gameSetup/NewGame";
import GameEnd from "@/components/gameEnd/GameEnd";
import { useEffect, useState } from "react";
import {
  faCat,
  faDog,
  faHippo,
  faSpider,
  faFish,
  faDragon,
  faKiwiBird,
  faWorm,
  faShrimp,
  faMosquito,
  faHorse,
  faFrog,
  faDove,
  faBugs,
  faOtter,
  faLocust,
  faCow,
  faCrow,
} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [settings, setSettings] = useState({
    status: false,
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
    gridSize: 4,
  });

  const [playersData, setPlayersData] = useState({
    currPlayer: 1,
    players: Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      score: 0,
    })),
  });

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    setGrid((prev) => ({
      ...prev,
      gridSize: settings.selectedGridSize === "4x4" ? 4 : 6,
    }));
  }, [settings.selectedGridSize]);

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
    const pairs =
      settings.selectedTheme === "Numbers"
        ? Array.from(
            { length: (grid.gridSize * grid.gridSize) / 2 },
            (_, index) => index + 1
          )
        : [
            faCat,
            faDog,
            faHippo,
            faSpider,
            faFish,
            faDragon,
            faKiwiBird,
            faWorm,
            faShrimp,
            faMosquito,
            faHorse,
            faFrog,
            faDove,
            faBugs,
            faOtter,
            faDove,
            faLocust,
            faCow,
            faCrow,
          ].slice(0, (grid.gridSize * grid.gridSize) / 2);

    const shuffledPairs = [...pairs, ...pairs].sort(() => Math.random() - 0.5);

    const initialRotationState = shuffledPairs.map((value) => ({
      value,
      bgColor: "bg-[#bbcdd8]",
      status: false,
    }));
    setGrid((prevGrid) => ({ ...prevGrid, gridValues: initialRotationState }));
  };

  const handleRestart = () => {
    setGameStatus({ isTimerRunning: false, moves: 0, time: 0 });
    setGrid((prev) => ({
      gridValues: [],
      flippedValues: [],
      flippedCount: 0,
      gridSize: prev.gridSize,
    }));
    setTotalScore(0);
    setPlayersData((prev) => ({
      currPlayer: 1,
      players: prev.players.map((player) => ({ ...player, score: 0 })),
    }));
    shuffleGridValues();
  };

  return (
    <>
      <NewGame
        settings={settings}
        setSettings={setSettings}
        shuffleGridValues={shuffleGridValues}
      />
      <Navbar
        settings={settings}
        setSettings={setSettings}
        handleRestart={handleRestart}
        setGameStatus={setGameStatus}
        gameStatus={gameStatus}
      />
      <div className="lg:container mx-auto px-4">
        <Grid
          settings={settings}
          grid={grid}
          setGrid={setGrid}
          shuffleGridValues={shuffleGridValues}
          setGameStatus={setGameStatus}
          setTotalScore={setTotalScore}
          setPlayersData={setPlayersData}
          playersData={playersData}
        />
      </div>
      <Footer
        settings={settings}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        playersData={playersData}
      />
      {totalScore * 2 === grid.gridSize * grid.gridSize && (
        <GameEnd
          settings={settings}
          setSettings={setSettings}
          gameStatus={gameStatus}
          playersData={playersData}
          setGameStatus={setGameStatus}
          handleRestart={handleRestart}
        />
      )}
    </>
  );
};

export default Main;
