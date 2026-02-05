"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";
import {
  FaHome,
  FaFootballBall,
  FaBasketballBall,
  FaInfoCircle,
  FaBlog,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import { GiPodium } from "react-icons/gi";
import { FaFutbol } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    localStorage.removeItem("key");
    await signOut({
      callbackUrl: "https://buffstreams.us/login",
    });
    window.location.href = "https://buffstreams.us/login";
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <div className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
          <Link href="/" className={styles.navItem}>
            <FaHome /> Home
          </Link>

          <Link href="/footballmatches" className={styles.navItem}>
            <FaFutbol /> NFL
          </Link>

          <Link href="/basketballinfo" className={styles.navItem}>
            <FaBasketballBall /> NBA
          </Link>

          <Link href="/baseballmatches" className={styles.navItem}>
            <FaFootballBall /> MLB
          </Link>

          <Link href="/fightmatches" className={styles.navItem}>
            <FaFootballBall /> UFC
          </Link>

          <Link href="/standingstable" className={styles.navItem}>
            <GiPodium /> Standings
          </Link>

          {session?.user?.role === "admin" && (
            <>
              <Link href="/dashboard" className={styles.navItem}>
                <FaTachometerAlt /> Dashboard
              </Link>
            </>
          )}

          {session?.user ? (
            <button className={styles.button} onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className={styles.navItem}>
                <FaSignInAlt /> Login
              </Link>
              <Link href="/signup" className={styles.navItem}>
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
