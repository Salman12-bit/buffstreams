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
          <option>Fight / MMA Matches</option>
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
              post.title?.toLowerCase().includes("fight") ||
              post.content?.toLowerCase().includes("fight") ||
              post.title?.toLowerCase().includes("mma") ||
              post.content?.toLowerCase().includes("mma") ||
              post.title?.toLowerCase().includes("ufc") ||
              post.content?.toLowerCase().includes("ufc") ||
              post.title?.toLowerCase().includes("boxing") ||
              post.content?.toLowerCase().includes("boxing") ||
              post.title?.toLowerCase().includes("kickboxing") ||
              post.content?.toLowerCase().includes("kickboxing") ||
              post.title?.toLowerCase().includes("karate") ||
              post.content?.toLowerCase().includes("karate") ||
              post.title?.toLowerCase().includes("judo") ||
              post.content?.toLowerCase().includes("judo") ||
              post.title?.toLowerCase().includes("wrestling") ||
              post.content?.toLowerCase().includes("wrestling") ||
              post.title?.toLowerCase().includes("tapout") ||
              post.content?.toLowerCase().includes("tapout") ||
              post.title?.toLowerCase().includes("knockout") ||
              post.content?.toLowerCase().includes("knockout") ||
              post.title?.toLowerCase().includes("fight night") ||
              post.content?.toLowerCase().includes("fight night")
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
