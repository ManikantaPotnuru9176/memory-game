import { useEffect, useState } from "react";

import useGameStore from "@/store/gameStore";
import Navbar from "./navbar/Navbar";
import Grid from "./hero/Grid";
import Footer from "./footer/Footer";
import GameEnd from "./gameEnd/GameEnd";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";

const Main = () => {
  const [show, setShow] = useState(false);

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
    setShow(true);
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (!user) router.push("/auth/signin");
    shuffleGridValues();
  }, []);

  return (
    <div
      className={`transform ${
        show ? "translate-x-0" : "translate-x-full"
      } transition-transform ease-in-out duration-500`}
    >
      <Navbar />
      <Grid />
      <Footer />
      <GameEnd />
    </div>
  );
};

export default Main;
