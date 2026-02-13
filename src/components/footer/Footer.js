"use client";

import { useEffect, useState } from "react";
import './footer.css';


export default function Footer() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-left">
        <p>Copyright © Buffstreams.us All Rights Reserved.</p>
      </div>

      <div className="footer-right">
        <a href="#">Policy</a>
        <span>|</span>
        <a href="#">Disclaimer</a>
        <span>|</span>
        <a href="contact">Contact Us</a>
      </div>

      {visible && (
        <div className="scroll-top" onClick={scrollToTop}>
          <span>↑</span>
        </div>
      )}
    </footer>
  );
}
