import { useEffect } from "react";

import Navbar from "@/components/navbar/Navbar";
import Grid from "@/components/hero/Grid";
import Footer from "@/components/footer/Footer";
import NewGame from "@/components/gameSetup/NewGame";
import GameEnd from "@/components/gameEnd/GameEnd";

import useGameStore from "@/store/gameStore";

const Main = () => {
  const settings = useGameStore((store) => store.settings);
  const adjustGridSize = useGameStore((store) => store.adjustGridSize);
  const adjustPlayers = useGameStore((store) => store.adjustPlayers);
  const shuffleGridValues = useGameStore((store) => store.shuffleGridValues);

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
      <Grid />
      <Footer />
      <GameEnd />
    </>
  );
};

export default Main;
