import { useEffect } from "react";

import useGameStore from "@/store/gameStore";
import NewGame from "./gameSetup/NewGame";
import Navbar from "./navbar/Navbar";
import Grid from "./hero/Grid";
import Footer from "./footer/Footer";
import GameEnd from "./gameEnd/GameEnd";

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
