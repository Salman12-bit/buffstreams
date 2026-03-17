"use client";

import "./basketball.css";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AFLpage() {
  const { data: session } = useSession();

  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [timeFilter, setTimeFilter] = useState("");

  const getData = async () => {
    try {
      const res = await fetch("/api/posts", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const json = await res.json();
      setData(json);
      setErr(false);
    } catch (error) {
      console.log("Fetch error:", error);
      setErr(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (session?.user?.role !== "admin") return;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      getData();
    } catch (err) {
      console.log(err);
    }
  };


  const filteredMatches = useMemo(() => {
    return data
      .filter((post) =>
        ["basketball", "nba"].some(
          (word) =>
            post.desc?.toLowerCase().includes(word) ||
            post.title?.toLowerCase().includes(word)
        )
      )
      .filter((post) => {
        if (!timeFilter) return true;
        const isAM = post.time.toUpperCase().includes("AM");
        const isPM = post.time.toUpperCase().includes("PM");
        return (timeFilter === "AM" && isAM) || (timeFilter === "PM" && isPM);
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.matchDate} ${a.time}`);
        const dateB = new Date(`${b.matchDate} ${b.time}`);
        return dateA - dateB;
      });
  }, [data, timeFilter]);


  const grouped = useMemo(() => {
    return filteredMatches.reduce((groups, post) => {
      const dateKey = new Date(post.matchDate).toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(post);
      return groups;
    }, {});
  }, [filteredMatches]);


  const sortedDates = useMemo(() => {
    return Object.keys(grouped).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
  }, [grouped]);


  const finalDates = useMemo(() => {
    const today = new Date().toDateString();
    return [today, ...sortedDates.filter((d) => d !== today)];
  }, [sortedDates]);

  if (err) return <p>Error loading matches.</p>;

  return (
    <section className="cric">

      <div className="filter">
        <button className="f-btn active">Live</button>

        <select
          className="f-select"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="">All Matches</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>

        <button className="f-btn">Popular</button>
      </div>

      {finalDates.map((date) => {
        if (!grouped[date]) return null;

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
            <h3 className="date-head">
              {dayName} <span>{month} {dayNum}</span>
            </h3>

            <div className="grid">
              {grouped[date].map((post) => (
                <div className="wrap" key={post._id}>

                  <Link href={`/${post._id}`}>
                    <div className="card">
                      <div className="date">{month} {dayNum}</div>
                      <div className="star">★</div>

                      <div className="img-box">
                        <img
                          src={post.file}
                          loading="lazy"
                          alt={post.title}
                        />
                      </div>

                      <h4 className="match-title">{post.title}</h4>

                      <div className="info">
                        <span className="time">{post.time}</span>
                        <span className="league">{post.desc}</span>
                      </div>
                    </div>
                  </Link>

                  {session?.user?.role === "admin" && (
                    <button
                      className="del"
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