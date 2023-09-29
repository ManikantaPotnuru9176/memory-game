import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";
import Loading from "@/components/Loading";
import useGameStore from "@/store/gameStore";

export default function Home() {
  const setUser = useAuthStore((store) => store.setUser);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const rememberSettings = JSON.parse(
      localStorage.getItem("rememberSettings")
    );
    rememberSettings && user
      ? router.push("/game/game")
      : router.push("/game/newgame");
  }, []);

  return <Loading />;
}
