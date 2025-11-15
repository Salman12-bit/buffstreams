"use client";

import React, { useEffect, useState } from "react";
import "./login.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";




const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [auth, setAuth] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("key");
    if (authData) {
      setAuth(JSON.parse(authData));
    }
  }, []);

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
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
      const user = { email, name: result.user?.name || 'User', role: result.user?.role || 'user' };
      localStorage.setItem("key", JSON.stringify(user));
      router.push("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      
      <Head>
        <title>Jigsaw Planet Login Information</title>
        <meta name="description" content="This is the login page for Jigsaw Planet." />
      </Head>
     

      <div className="login-container">
        <div className="login-box">
          <p className="intro-text">
            "Join the adventure! Log in to unlock your gaming potential and dive into thrilling challenges
            that test your skills. New here? Register now and start your journey—where every level conquered
            brings you closer to being the ultimate champion!"
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
              <Link href="/register" className="text-white">Sign Up</Link> /
              <Link href="/forget" className="text-white">Forget Password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
