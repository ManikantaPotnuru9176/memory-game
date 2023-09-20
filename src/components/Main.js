import { useEffect } from "react";

import useGameStore from "@/store/gameStore";
import NewGame from "./gameSetup/NewGame";
import Navbar from "./navbar/Navbar";
import Grid from "./hero/Grid";
import Footer from "./footer/Footer";
import GameEnd from "./gameEnd/GameEnd";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";

const Main = () => {
  const settings = useGameStore((store) => store.settings);
  const adjustGridSize = useGameStore((store) => store.adjustGridSize);
  const adjustPlayers = useGameStore((store) => store.adjustPlayers);
  const shuffleGridValues = useGameStore((store) => store.shuffleGridValues);

  const setUser = useAuthStore((store) => store.setUser);

  const router = useRouter();

  useEffect(() => {
    adjustGridSize();
  }, [settings.selectedGridSize]);

  useEffect(() => {
    adjustPlayers();
  }, [settings.selectedPlayers]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (!user) router.push("/auth/signin");
    shuffleGridValues();
  }, []);

  return (
    <>
      <Navbar />
      <Grid />
      <Footer />
      <GameEnd />
    </>
  );
};

export default Main;
