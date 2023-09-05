import React from "react";
import GameStatus from "./singlePlayer/GameStatus";
import Players from "./multiPlayer/Players";

const Footer = () => {
  return (
    <div className="pt-20 md:pt-28 pb-12">
      {false ? <GameStatus /> : <Players />}
    </div>
  );
};

export default Footer;
