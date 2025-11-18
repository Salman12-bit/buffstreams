"use client";

import "./cricket.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Cricketpage() {
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
          <option>Rugby Matches</option>
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
              post.title?.toLowerCase().includes("rugby") ||
              post.content?.toLowerCase().includes("rugby") ||
              post.title?.toLowerCase().includes("rugby league") ||
              post.content?.toLowerCase().includes("rugby league") ||
              post.title?.toLowerCase().includes("rugby union") ||
              post.content?.toLowerCase().includes("rugby union") ||
              post.title?.toLowerCase().includes("super rugby") ||
              post.content?.toLowerCase().includes("super rugby") ||
              post.title?.toLowerCase().includes("six nations") ||
              post.content?.toLowerCase().includes("six nations") ||
              post.title?.toLowerCase().includes("try") ||
              post.content?.toLowerCase().includes("try") ||
              post.title?.toLowerCase().includes("conversion") ||
              post.content?.toLowerCase().includes("conversion") ||
              post.title?.toLowerCase().includes("scrum") ||
              post.content?.toLowerCase().includes("scrum") ||
              post.title?.toLowerCase().includes("lineout") ||
              post.content?.toLowerCase().includes("lineout") ||
              post.title?.toLowerCase().includes("kick-off") ||
              post.content?.toLowerCase().includes("kick-off") ||
              post.title?.toLowerCase().includes("world cup") ||
              post.content?.toLowerCase().includes("world cup")
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
