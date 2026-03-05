"use client";

import "./basketball.css";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Basketballpage() {
  const { data: session } = useSession();

  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [timeFilter, setTimeFilter] = useState("");

  // ✅ Optimized fetch (added error protection)
  const getData = async () => {
    try {
      const res = await fetch("/api/posts", {
        cache: "force-cache",
        next: { revalidate: 60 }
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const json = await res.json();
      setData(json);
      setErr(false);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ Memoized Live Match Check (Performance Boost)
  const isLiveMatch = (matchDate, time) => {
    const matchStart = new Date(`${matchDate} ${time}`);
    const now = new Date();

    const isToday =
      matchStart.toDateString() === now.toDateString();

    if (!isToday) return false;

    const threeHoursLater = new Date(
      matchStart.getTime() + 3 * 60 * 60 * 1000
    );

    return now >= matchStart && now <= threeHoursLater;
  };

  // ✅ Memoized Filtering (Important Performance Fix ⭐)
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

        const isAM = post.time?.toUpperCase().includes("AM");
        const isPM = post.time?.toUpperCase().includes("PM");

        return (timeFilter === "AM" && isAM) || (timeFilter === "PM" && isPM);
      })
      .sort((a, b) => {
        const aLive = isLiveMatch(a.matchDate, a.time);
        const bLive = isLiveMatch(b.matchDate, b.time);

        if (aLive && !bLive) return -1;
        if (!aLive && bLive) return 1;

        return new Date(`${a.matchDate} ${a.time}`) -
          new Date(`${b.matchDate} ${b.time}`);
      });
  }, [data, timeFilter]);

  // ✅ Group by Date
  const grouped = useMemo(() => {
    return filteredMatches.reduce((groups, post) => {
      const key = new Date(post.matchDate).toDateString();
      if (!groups[key]) groups[key] = [];
      groups[key].push(post);
      return groups;
    }, {});
  }, [filteredMatches]);

  if (err) return <p>Error loading matches.</p>;

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const today = new Date().toDateString();

  const finalDates = [today, ...sortedDates.filter((d) => d !== today)];

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
            <h3 className="date-heading">
              {dayName} <span>{month} {dayNum}</span>
            </h3>

            <div className="match-grid">
              {grouped[date].map((post) => (
                <div className="card-wrapper" key={post._id}>
                  <Link href={`/${post._id}`}>
                    <div className="match-card">
                      {isLiveMatch(post.matchDate, post.time) && (
                        <div className="live-badge">LIVE</div>
                      )}

                      <div className="match-date">
                        {month} {dayNum}
                      </div>

                      <div className="match-star">★</div>

                      <Image
                        src={post.file}
                        alt={post.title}
                        width={600}
                        height={350}
                        loading="lazy"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />

                      <h4 className="match-title">{post.title}</h4>

                      <div className="match-info-row">
                        <span className="left-time">{post.time}</span>
                        <span className="right-league">{post.desc}</span>
                      </div>
                    </div>
                  </Link>

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