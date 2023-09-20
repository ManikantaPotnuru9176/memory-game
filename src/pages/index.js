import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";

export default function Home() {
  const user = useAuthStore((store) => store.user);
  const setUser = useAuthStore((store) => store.setUser);

  const router = useRouter();

  useEffect(() => {
    router.push("/game/newgame");
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return null;
}
