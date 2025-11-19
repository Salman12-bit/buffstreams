"use client";

import "./cricket.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Cricketpage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState("");

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
      if (session?.user?.role !== "admin") return;

      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      getData();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const handleCardClick = (id) => {
    router.push("/livematch");
  };

  const groupByDate = (posts) => {
    return posts.reduce((groups, post) => {
      const dateKey = new Date(post.matchDate).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(post);
      return groups;
    }, {});
  };

  const filteredMatches = data
    .filter((post) =>
      ["cricket", "ipl", "psl", "bpl", "odi", "t20"].some(
        (word) =>
          post.desc?.toLowerCase().includes(word) ||
          post.title?.toLowerCase().includes(word)
      )
    )
    .filter((post) => {
      if (!timeFilter) return true;
      const postHour = parseInt(post.time.split(":")[0], 10);
      const isAM = post.time.toUpperCase().includes("AM");
      const isPM = post.time.toUpperCase().includes("PM");

      return (timeFilter === "AM" && isAM) || (timeFilter === "PM" && isPM);
    });

  const grouped = groupByDate(filteredMatches);

  return (
    <section className="cricket-page">
      <div className="filter-bar">
        <button className="filter-btn active">Live</button>

        <select
          className="filter-select"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="">All Matches</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <button className="filter-btn">Popular</button>
      </div>

      {Object.keys(grouped).map((date) => {
        const d = new Date(date);
        const dayName = d
          .toLocaleDateString("en-US", { weekday: "short" })
          .toUpperCase();
        const month = d
          .toLocaleDateString("en-US", { month: "short" })
          .toUpperCase();
        const dayNum = d.getDate();

        return (
          <div key={date}>
            <h3 className="date-heading">
              {dayName} <span>{month} {dayNum}</span>
            </h3>

            <div className="match-grid">
              {grouped[date].map((post) => (
                <div className="card-wrapper" key={post._id}>
                  <div
                    className="match-card"
                    onClick={() => handleCardClick(post._id)}
                  >
                    <div className="match-date">{month} {dayNum}</div>
                    <div className="match-star">★</div>
                    <div className="match-flags image-bg">
                      <img src={post.file} alt="post" />
                    </div>
                    <h4 className="match-title">{post.title}</h4>
                    <div className="match-info-row">
                      <span className="left-time">{post.time}</span>
                      <span className="right-league">{post.desc}</span>
                    </div>
                  </div>

                  {session?.user?.role === "admin" && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
