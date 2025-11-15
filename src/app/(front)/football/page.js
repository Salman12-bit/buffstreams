"use client";

import "./cricket.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Cricketpage() {
  const router = useRouter();
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
          <option>Cricket Matches</option>
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
              post.title?.toLowerCase().includes("football") ||
              post.content?.toLowerCase().includes("football") ||
              post.title?.toLowerCase().includes("soccer") ||
              post.content?.toLowerCase().includes("soccer") ||
              post.title?.toLowerCase().includes("fifa") ||
              post.content?.toLowerCase().includes("fifa") ||
              post.title?.toLowerCase().includes("epl") ||
              post.content?.toLowerCase().includes("epl") ||
              post.title?.toLowerCase().includes("premier league") ||
              post.content?.toLowerCase().includes("premier league") ||
              post.title?.toLowerCase().includes("la liga") ||
              post.content?.toLowerCase().includes("la liga") ||
              post.title?.toLowerCase().includes("champions league") ||
              post.content?.toLowerCase().includes("champions league") ||
              post.title?.toLowerCase().includes("goal") ||
              post.content?.toLowerCase().includes("goal") ||
              post.title?.toLowerCase().includes("penalty") ||
              post.content?.toLowerCase().includes("penalty") ||
              post.title?.toLowerCase().includes("world cup") ||
              post.content?.toLowerCase().includes("world cup")
            )
            .map((post) => (
              <div className="card-wrapper" key={post._id}>

                {/* ✅ Clickable card using router.push */}
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
