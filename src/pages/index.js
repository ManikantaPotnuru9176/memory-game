import Navbar from "@/components/navbar/Navbar";
import Grid from "@/components/hero/Grid";
import Footer from "@/components/footer/Footer";
import NewGame from "@/components/gameSetup/NewGame";
import GameEnd from "@/components/gameEnd/GameEnd";
import { useState } from "react";

export default function Home() {
  const [newGame, setNewGame] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState("Numbers");
  const [selectedPlayers, setSelectedPlayers] = useState(1);
  const [selectedGridSize, setSelectedGridSize] = useState("4x4");

  return (
    <>
      {!newGame ? (
        <>
          <Navbar setNewGame={setNewGame} />
          <div className="lg:container mx-auto px-4">
            <Grid />
          </div>
          <Footer />
          {false && <GameEnd setNewGame={setNewGame} />}
        </>
      ) : (
        <NewGame
          setNewGame={setNewGame}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          selectedGridSize={selectedGridSize}
          setSelectedGridSize={setSelectedGridSize}
        />
      )}
    </>
  );
}
