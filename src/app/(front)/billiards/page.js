"use client";

import "./cricket.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // ✅ Import useSession

export default function Cricketpage() {
  const router = useRouter();
  const { data: session } = useSession(); // ✅ useSession hook
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("api/posts", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch posts");

      const json = await res.json();
      setData(json);
      setErr(false);
    } catch (error) {
      console.log("Fetch error:", error);
      setErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (session?.user?.role !== "admin") return; // ✅ Admin-only check
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      getData();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const handleCardClick = (id) => {
    router.push("/livematch");
  };

  return (
    <section className="cricket-page">
      <div className="filter-bar">
        <button className="filter-btn active">Live</button>
        <button className="filter-btn">Popular</button>

        <select className="filter-select">
          <option>Billiards Matches</option>
        </select>
      </div>

      <h3 className="date-heading">
        TODAY <span>{new Date().toDateString()}</span>
      </h3>

      <div className="match-grid">
        {isLoading ? (
          <div className="loader"><div className="spinner"></div></div>
        ) : err ? (
          <p className="error">Error loading posts.</p>
        ) : (
          data
            ?.filter((post) =>
              post.title?.toLowerCase().includes("billiards") ||
              post.content?.toLowerCase().includes("billiards") ||
              post.title?.toLowerCase().includes("pool") ||
              post.content?.toLowerCase().includes("pool") ||
              post.title?.toLowerCase().includes("snooker") ||
              post.content?.toLowerCase().includes("snooker") ||
              post.title?.toLowerCase().includes("cue") ||
              post.content?.toLowerCase().includes("cue") ||
              post.title?.toLowerCase().includes("8-ball") ||
              post.content?.toLowerCase().includes("8-ball") ||
              post.title?.toLowerCase().includes("9-ball") ||
              post.content?.toLowerCase().includes("9-ball") ||
              post.title?.toLowerCase().includes("break shot") ||
              post.content?.toLowerCase().includes("break shot") ||
              post.title?.toLowerCase().includes("rack") ||
              post.content?.toLowerCase().includes("rack") ||
              post.title?.toLowerCase().includes("cue ball") ||
              post.content?.toLowerCase().includes("cue ball")
            )
            .map((post) => (
              <div className="card-wrapper" key={post._id}>

                {/* ✅ Clickable card */}
                <div
                  className="match-card"
                  onClick={() => handleCardClick(post._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="match-date">{post.date || "Today"}</div>
                  <div className="match-star">★</div>
                  <div className="match-flags image-bg">
                    <img src={post.file} alt="post" />
                  </div>
                  <h4 className="match-title">{post.title}</h4>
                  <p className="match-league">{post.content}</p>
                  <p className="match-time">{post.time || "No Time"}</p>
                </div>

                {/* ✅ Delete button for admin only */}
                {session?.user?.role === "admin" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
        )}
      </div>
    </section>
  );
}
