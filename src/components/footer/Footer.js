import React from "react";

import GameStatus from "./singlePlayer/GameStatus";
import Players from "./multiPlayer/Players";

import useGameStore from "@/store/gameStore";

const Footer = () => {
  const settings = useGameStore((store) => store.settings);

  return (
    <div className="pt-8 md:pt-12 lg:pt-16">
      {settings.selectedPlayers === 1 ? <GameStatus /> : <Players />}
    </div>
  );
};

export default Footer;
