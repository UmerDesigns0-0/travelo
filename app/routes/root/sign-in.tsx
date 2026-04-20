import { Link } from "react-router";
import {
  getExistingUser,
  loginWithGoogle,
  storeUserData,
} from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { redirect } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (user.$id) {
      throw redirect("/auth-processing"); // User is logged in, redirect to a processing page
    }
    return null;
  } catch (error) {
    console.log("No authenticated user");
    return null;
  }
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("Sign in with Google");
  const navigate = useNavigate();

  async function login() {
    try {
      setIsLoading(true);

      try {
        const user = await account.get();

        // user exists → already logged in
        if (user?.$id) {
          navigate("/auth-processing");
          setBtnText("Redirecting...");
          setIsLoading(true);
          return;
        }
      } catch {
        // user not logged in → continue to Google login
      }

      await loginWithGoogle();
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="auth">
      <section className="flex-center glassmorphism size-full px-6">
        <div className="sign-in-card">
          <header className="header">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-7.5 select-none"
                draggable="false"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Travelo</h1>
          </header>
          <article>
            <h2 className="p-24-semibold text-dark-100 text-center">
              Start Your Journey
            </h2>
            <p className="p-18-regular text-center text-slate-500 leading-7!">
              Sign in to your account and start planning your next adventure
              with Travelo.
            </p>
          </article>

          <button
            disabled={isLoading}
            className="button-class h-11 w-full cursor-pointer outline-none"
            onClick={login}
          >
            <img
              src="/assets/icons/google.svg"
              alt="google-icon"
              className="size-5 mr-5 select-none"
              draggable="false"
            />
            <p className="font-semibold text-white">
              {isLoading ? "Signing in..." : btnText}
            </p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
