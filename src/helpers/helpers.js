import axios from "axios";

export const getGameSettings = async (uid, setSettings) => {
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
}`;

  const variables = { userId: uid };

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

    // await router.push("/game/game");s
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const saveSettingsInHasura = async (user, settings) => {
  const admin_secret = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;
  const url = process.env.NEXT_PUBLIC_HASURA_API_URL;
  const query = `
    mutation insert_game_settings_one($userId: String!, $selectedTheme: String!, $noOfPlayers: Int!, $gridSize: String!) {
    insert_game_settings_one(
        object: {user_id: $userId, selected_theme: $selectedTheme, no_of_players: $noOfPlayers, grid_size: $gridSize}
        on_conflict: {constraint: game_settings_pkey, update_columns: [grid_size, no_of_players, selected_theme]}
    ) {
        grid_size
        no_of_players
        selected_theme
        user_id
    }
}

  `;

  const variables = {
    userId: user,
    selectedTheme: settings.selectedTheme,
    noOfPlayers: settings.selectedPlayers,
    gridSize: settings.selectedGridSize,
  };

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

    // console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
