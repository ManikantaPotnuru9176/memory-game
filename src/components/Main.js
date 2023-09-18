import Navbar from "@/components/navbar/Navbar";
import Grid from "@/components/hero/Grid";
import Footer from "@/components/footer/Footer";
import NewGame from "@/components/gameSetup/NewGame";
import GameEnd from "@/components/gameEnd/GameEnd";
import { useEffect } from "react";
import useGameStore from "./gameStore";

const Main = () => {
  const settings = useGameStore((store) => store.settings);
  const adjustGridSize = useGameStore((store) => store.adjustGridSize);
  const adjustPlayers = useGameStore((store) => store.adjustPlayers);
  const shuffleGridValues = useGameStore((store) => store.shuffleGridValues);
  const totalScore = useGameStore((store) => store.totalScore);
  const gridSize = useGameStore((store) => store.grid.gridSize);

  useEffect(() => {
    adjustGridSize();
  }, [settings.selectedGridSize]);

  useEffect(() => {
    adjustPlayers();
  }, [settings.selectedPlayers]);

  useEffect(() => {
    shuffleGridValues();
  }, []);

  return (
    <>
      <NewGame />
      <Navbar />
      <div className="lg:container mx-auto px-4">
        <Grid />
      </div>
      <Footer />
      {totalScore * 2 === gridSize * gridSize && <GameEnd />}
    </>
  );
};

export default Main;
