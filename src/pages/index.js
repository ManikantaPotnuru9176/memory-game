import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";
import { auth } from "@/components/auth/config/firebaseConfig";

export default function Home() {
  const { user, isLoading, setUser, setIsLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    isLoading
      ? router.push("/game/loading")
      : user
      ? router.push("/game/game")
      : router.push("/auth/signin");
  }, [isLoading, user]);

  return null;
}
