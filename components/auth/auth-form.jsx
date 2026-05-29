"use client";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";

import classes from "./auth-form.module.css";
import { useRouter } from "next/navigation";

const createUser = async ({ email, password }) => {
  const response = fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export default function AuthForm() {
  const formRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
const router = useRouter();
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  //component
  const signUpHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get("password"); // استفاده مستقیم از FormData با key=name
    const email = formData.get("email");

    if (isLogin) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        });
        if (result.error) {
          toast.error(result.error);
        }
        if (result && !result.error) {
          toast.success("Login successful!");
          router.push("/");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } else {
      const response = await createUser({ email, password });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("error: ", errorData);
        toast.error(errorData.message || "Something went wrong!");
        return;
      }
      toast.success("your user created!");
      setIsLogin(true);
      formRef.current.reset();
    }
  };
  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={signUpHandler} ref={formRef}>
          <div className={classes.control}>
            <label htmlFor="email">enter your email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">enter your password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <div className={classes.actions}>
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
        <Toaster />
      </section>
    </>
  );
}
