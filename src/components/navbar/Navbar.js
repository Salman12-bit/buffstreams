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
  FaTachometerAlt
} from "react-icons/fa";
import { GiPodium } from "react-icons/gi";
import { FaFutbol } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

          <Link href="/football" className={styles.navItem}>
            <FaFutbol /> NFL
          </Link>

          <Link href="/basketball" className={styles.navItem}>
            <FaBasketballBall /> NBA
          </Link>

          <Link href="/baseball" className={styles.navItem}>
            <FaFootballBall /> MLB
          </Link>

          <Link href="/fight" className={styles.navItem}>
            <FaFootballBall /> UFC
          </Link>

          <Link href="/standings" className={styles.navItem}>
            <GiPodium /> Standings
          </Link>


          <Link href="/login" className={styles.navItem}>
            <FaSignInAlt /> Login
          </Link>

          <Link href="/register" className={styles.navItem}>
            <FaUserPlus /> Register
          </Link>

          <Link href="/dashboard" className={styles.navItem}>
            <FaTachometerAlt /> Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
