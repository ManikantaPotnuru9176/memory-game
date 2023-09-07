import React from "react";
import GameStatus from "./singlePlayer/GameStatus";
import Players from "./multiPlayer/Players";

const Footer = () => {
  return (
    <div className="pt-8 md:pt-12 lg:pt-16">
      {false ? <GameStatus /> : <Players />}
    </div>
  );
};

export default Footer;
