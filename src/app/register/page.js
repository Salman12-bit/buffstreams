"use client";

import React, { useState } from "react";
import "./register.css"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstname = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      if (res.status === 201) {
        router.push("/login");
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="title">Create an Account</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">First Name</label>
          <input type="text" placeholder="First-name" required className="input" />

          <label className="form-label">Last Name</label>
          <input type="text" placeholder="Last-name" required className="input" />

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

          <button className="button">Register</button>
          {error && <p className="error">Something went wrong!</p>}
        </form>
        <div className="text-center mt-4">
          <p className="text-white">Already have an account?
            <Link href="/login" className="text-white"> Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
