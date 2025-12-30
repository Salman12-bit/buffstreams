"use client";

import React, { useEffect, useState, Suspense } from "react";
import "./login.css";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("key");
      if (authData) {
        setAuth(JSON.parse(authData));
      }
    }
  }, []);

  
  useEffect(() => {
    if (params) {
      setError(params.get("error"));
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      const user = { email, name: result.user?.name || "User" };
      localStorage.setItem("key", JSON.stringify(user));
      router.push("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <p className="intro-text">
          "Join the adventure! Log in to unlock your gaming potential..."
        </p>
        <h2 className="subtitle">Sign-In Here</h2>

        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">Email</label>
          <input type="text" placeholder="Email" required className="input" />
          <label className="form-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="input password-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <button className="button">Login</button>
          {error && <p className="error">{error}</p>}
        </form>

        <div className="text-center">
          <p className="text-white">
            Don't have an account?
            <br />
            <Link href="/signup" className="text-white">Sign Up</Link> /
            <Link href="/forget" className="text-white">Forget Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};


const LoginWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Login />
  </Suspense>
);

export default LoginWithSuspense;
