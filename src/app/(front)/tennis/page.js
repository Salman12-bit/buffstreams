"use client";

import "./cricket.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Tennispage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewCounts, setViewCounts] = useState({});

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

  // Initialize view counts
  useEffect(() => {
    if (data.length === 0) return;
    const stored = sessionStorage.getItem("card_view_counts");
    if (stored) {
      setViewCounts(JSON.parse(stored));
    } else {
      const init = {};
      data.forEach((post) => (init[post._id] = 0));
      setViewCounts(init);
    }
  }, [data]);

  // Persist view counts
  useEffect(() => {
    if (Object.keys(viewCounts).length > 0) {
      sessionStorage.setItem("card_view_counts", JSON.stringify(viewCounts));
    }
  }, [viewCounts]);

  // Handle decrement on page unload
  useEffect(() => {
    const handleUnload = () => {
      const stored = sessionStorage.getItem("card_view_counts");
      if (!stored) return;

      let counts = JSON.parse(stored);
      data.forEach((post) => {
        const key = `watching_card_${post._id}`;
        if (sessionStorage.getItem(key)) {
          counts[post._id] = Math.max(counts[post._id] - 1, 0);
          sessionStorage.removeItem(key);
        }
      });
      sessionStorage.setItem("card_view_counts", JSON.stringify(counts));
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      getData();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const handleCardClick = (id) => {
    const key = `watching_card_${id}`;
    if (!sessionStorage.getItem(key)) {
      setViewCounts((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
      sessionStorage.setItem(key, "true");
    }
    router.push("/livematch");
  };

  return (
    <section className="cricket-page">
      <div className="filter-bar">
        <button className="filter-btn active">Live</button>
        <button className="filter-btn">Popular</button>
        <select className="filter-select">
          <option>Tennis Matches</option>
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
              post.title?.toLowerCase().includes("tennis") ||
              post.content?.toLowerCase().includes("tennis") ||
              post.title?.toLowerCase().includes("atp") ||
              post.content?.toLowerCase().includes("atp") ||
              post.title?.toLowerCase().includes("wta") ||
              post.content?.toLowerCase().includes("wta") ||
              post.title?.toLowerCase().includes("grand slam") ||
              post.content?.toLowerCase().includes("grand slam") ||
              post.title?.toLowerCase().includes("australian open") ||
              post.content?.toLowerCase().includes("australian open") ||
              post.title?.toLowerCase().includes("french open") ||
              post.content?.toLowerCase().includes("french open") ||
              post.title?.toLowerCase().includes("roland garros") ||
              post.content?.toLowerCase().includes("roland garros") ||
              post.title?.toLowerCase().includes("wimbledon") ||
              post.content?.toLowerCase().includes("wimbledon") ||
              post.title?.toLowerCase().includes("us open") ||
              post.content?.toLowerCase().includes("us open") ||
              post.title?.toLowerCase().includes("ace") ||
              post.content?.toLowerCase().includes("ace") ||
              post.title?.toLowerCase().includes("forehand") ||
              post.content?.toLowerCase().includes("forehand") ||
              post.title?.toLowerCase().includes("backhand") ||
              post.content?.toLowerCase().includes("backhand") ||
              post.title?.toLowerCase().includes("match point") ||
              post.content?.toLowerCase().includes("match point")
            )
            .map((post) => (
              <div className="card-wrapper" key={post._id} style={{ position: "relative" }}>

                <div className="view-count">
                  {viewCounts[post._id] ?? 0} 👁️ LIVE
                </div>

                <div
                  className="match-card"
                  onClick={() => handleCardClick(post._id)}
                  style={{ cursor: "pointer", position: "relative" }}
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

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            ))
        )}
      </div>
    </section>
  );
}
