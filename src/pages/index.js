import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";
import Loading from "@/components/Loading";
import axios from "axios";
import useGameStore from "@/store/gameStore";

export default function Home() {
  const setUser = useAuthStore((store) => store.setUser);

  const setSettings = useGameStore((store) => store.setSettings);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

    const rememberSettings = JSON.parse(
      localStorage.getItem("rememberSettings")
    );

    rememberSettings && user ? getSettings(user) : router.push("/game/newgame");
  }, []);

  const getSettings = async (id) => {
    const admin_secret = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;
    const url = process.env.NEXT_PUBLIC_HASURA_API_URL;
    const query = `
    query getSettings($userId: String!) {
  game_settings_by_pk(user_id: $userId) {
    user_id
    selected_theme
    no_of_players
    grid_size
  }
}

  `;
    const variables = { userId: id };

    try {
      const response = await axios.post(
        url,
        {
          query,
          variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": admin_secret,
          },
        }
      );
      const data = await response.data.data.game_settings_by_pk;
      // console.log("Data: ", data);
      await setSettings({
        selectedTheme: data.selected_theme,
        selectedPlayers: data.no_of_players,
        selectedGridSize: data.grid_size,
      });
      await router.push("/game/game");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return <Loading />;
}
