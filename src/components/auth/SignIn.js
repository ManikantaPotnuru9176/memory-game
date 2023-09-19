import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./config/firebaseConfig";
import { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signIn = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    try {
      signInWithEmailAndPassword(auth, email, password);
      router.push("/game/game");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div
      id="signIn"
      className={`z-50 fixed inset-0 bg-[#142838] transition-transform ease-in-out duration-500 transform translate-x-0`}
    >
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
            Sign in to your account
          </h1>
          <form className="flex flex-col gap-6" onSubmit={signIn}>
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
                className="bg-[#dee7ed] border border-[#7b9fb7] text-gray sm:text-sm rounded-lg focus:border-[#152836] block w-full py-2 md:py-4 mt-2 pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
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
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 rounded accent-yellow-500 cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-[#152836]">
                    Remember me
                  </label>
                </div>
              </div>
              <a className="text-sm font-medium text-[#152836] hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-sm md:text-2xl text-center bg-[#fca417] hover:bg-[#fcba4f] text-white font-medium rounded-lg px-5 py-2.5"
              onClick={(e) => signIn(e)}
            >
              Sign in
            </button>
            <p className="text-sm font-light text-[#152836]">
              Don’t have an account yet?{" "}
              <a
                className="font-medium text-[#142838] hover:underline"
                onClick={() => router.push("/auth/signup")}
              >
                Sign up here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
