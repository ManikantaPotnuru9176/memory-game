import React, { useEffect } from "react";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "./config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const email = useAuthStore((store) => store.email);
  const setEmail = useAuthStore((store) => store.setEmail);
  const password = useAuthStore((store) => store.password);
  const setPassword = useAuthStore((store) => store.setPassword);
  const confirmPassword = useAuthStore((store) => store.confirmPassword);
  const setConfirmPassword = useAuthStore((store) => store.setConfirmPassword);
  const showPassword = useAuthStore((store) => store.showPassword);
  const setShowPassword = useAuthStore((store) => store.setShowPassword);
  const errorPassword = useAuthStore((store) => store.errorPassword);
  const setErrorPassword = useAuthStore((store) => store.setErrorPassword);
  const handleMatch = useAuthStore((store) => store.handleMatch);
  const rememberMe = useAuthStore((store) => store.rememberMe);
  const setRememberMe = useAuthStore((store) => store.setRememberMe);

  const setUser = useAuthStore((store) => store.setUser);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (user) router.push("/game/newgame");
  }, []);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
    localStorage.setItem("rememberMe", JSON.stringify(!rememberMe));
  };

  const signUp = async (e) => {
    e.preventDefault();
    console.log("error: ", errorPassword);
    if (errorPassword[0] || errorPassword[1]) {
      toast.error("Check your entered passwords.", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    if (rememberMe)
      localStorage.setItem("rememberedEmail", JSON.stringify(email));
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Successfully Signed up", {
        duration: 3000,
        position: "top-right",
      });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/game/game");
    } catch (error) {
      toast.error("Invalid email or password. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
      console.log("Error: ", error.message);
    }
  };

  return (
    <div
      id="signIn"
      className={`z-50 fixed inset-0 bg-[#142838] transition-transform ease-in-out duration-500 transform translate-x-0`}
    >
      <Toaster />
      <div
        className="px-6 mt-6"
        role="dialog"
        aria-modal="true"
        aria-label="Memory Game Setup"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white text-center pb-6">
          Memory Game
        </h1>
        <div className="bg-white p-6 md:p-14 rounded-lg md:rounded-xl lg:rounded-2xl max-w-[40.875rem] mx-auto">
          <h1 className="text-xl font-bold text-[#152836] md:text-2xl pb-8">
            Create a account
          </h1>
          <form className="flex flex-col gap-6" onSubmit={signUp}>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute top-[62%] left-3 text-[#152836]"
              />
              <label
                htmlFor="email"
                className="text-[#152836] text-lg md:text-xl font-bold"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-[#dee7ed] border border-[#7b9fb7] text-gray sm:text-sm rounded-lg focus:border-[#152836] block w-full py-2 md:py-4 mt-2 pl-10"
                placeholder="John@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faKey}
                className="absolute top-[62%] left-3 text-[#152836]"
              />
              <label
                htmlFor="password"
                className="text-[#152836] text-lg md:text-xl font-bold"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className={`bg-[#dee7ed] ${
                  errorPassword[0]
                    ? "border-2 border-red-500"
                    : "border border-[#7b9fb7]"
                } text-gray sm:text-sm rounded-lg block w-full py-2 md:py-4 mt-2 pl-10`}
                value={password}
                onChange={(e) => {
                  const pass = e.target.value;
                  setPassword(pass);
                  pass.length < 6
                    ? setErrorPassword([true, errorPassword[1]])
                    : setErrorPassword([false, false]);
                  handleMatch();
                }}
                required
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[70%] right-4 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} cursor="pointer" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} cursor="pointer" />
                  )}
                </button>
              )}
            </div>
            {errorPassword[0] && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs -mt-4 ml-1">
                Password should be at least 6 characters long !
              </span>
            )}
            <div className="relative">
              <FontAwesomeIcon
                icon={faKey}
                className="absolute top-[62%] left-3 text-[#152836]"
              />
              <label
                htmlFor="confirmPassword"
                className="text-[#152836] text-lg md:text-xl font-bold"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className={`bg-[#dee7ed] border border-[#7b9fb7] ${
                  errorPassword[1]
                    ? "border-2 border-red-500"
                    : "border border-[#7b9fb7]"
                } text-gray sm:text-sm rounded-lg focus:border-[#152836] block w-full py-2 md:py-4 mt-2 pl-10`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  handleMatch();
                }}
                required
              />
              {confirmPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[70%] right-4 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} cursor="pointer" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} cursor="pointer" />
                  )}
                </button>
              )}
            </div>
            {errorPassword[1] && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs -mt-4 ml-1">
                Password doesn't match !
              </span>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 rounded accent-yellow-500 cursor-pointer"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-[#152836]">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-sm md:text-2xl text-center bg-[#fca417] hover:bg-[#fcba4f] text-white font-medium rounded-lg px-5 py-2.5"
            >
              Sign up
            </button>
            <p className="text-sm font-light text-[#152836]">
              Already have an account?{" "}
              <a
                className="font-medium text-[#142838] hover:underline cursor-pointer"
                onClick={() => router.push("/auth/signin")}
              >
                Sign in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
