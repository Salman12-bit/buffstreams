"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./post.css";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const baseUrl =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : process.env.LIVE_LINK ?? "https://buffstreams.us";

      const res = await fetch(`${baseUrl}/api/posts/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("❌ API Error:", res.status);
        return;
      }

      const data = await res.json();

      // -------- FIXED TIME PARSING HERE --------
      const dateParts = data.matchDate.split("-");
      const matchDate = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
      );

      // FIX: No timezone conversion
      const [hour, minute] = data.time.split(" ")[0].split(":");
      const ampm = data.time.split(" ")[1];

      let fixedHour = parseInt(hour);
      if (ampm === "PM" && fixedHour !== 12) fixedHour += 12;
      if (ampm === "AM" && fixedHour === 12) fixedHour = 0;

      matchDate.setHours(fixedHour, parseInt(minute), 0, 0);

      const formattedDate = matchDate.toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const formattedTime = matchDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setPost({
        ...data,
        formattedDate,
        formattedTime,
        matchDateObj: matchDate,
      });

      setHasStarted(new Date() >= matchDate);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!post?.matchDateObj) return;

    const timer = setInterval(() => {
      const now = new Date();
      if (now >= post.matchDateObj) {
        setHasStarted(true);
        clearInterval(timer);
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [post]);

  if (!post) return null;

  return (
    <div className="post-container">
      <div className="post-card card-glow">

        <div className="card-header">
          <h1 className="post-title">{post.title}</h1>
          <span className="streams-tag">1 stream</span>
        </div>

        {!hasStarted ? (
          <div className="match-box">
            <p className="waiting-text">
              ⏳ Match will start at <b>{post.formattedTime}</b>
            </p>
            <p className="date-text">📅 {post.formattedDate}</p>
          </div>
        ) : (
          <>
            <div className="stream-item">
              <div className="left">
                <span className="badge-hd">HD</span>
                <span className="stream-name">Stream 1</span>
              </div>
              <span className="lang-tag">🌐 English</span>
            </div>

            <div className="stream-box">
              <iframe
                src={post.streamLink}
                allowFullScreen
                frameBorder="0"
                className="stream-iframe"
              ></iframe>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
