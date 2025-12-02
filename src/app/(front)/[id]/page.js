"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import YouTubePlayer from "@/components/YouTubePlayer";
import "./post.css";

export default function PostPage() {
  const { id } = useParams();
  const { data: session } = useSession();

  const [post, setPost] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newUrl, setNewUrl] = useState("");

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


      const dateParts = data.matchDate.split("-");
      const matchDate = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
      );

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
      if (new Date() >= post.matchDateObj) {
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


        {session?.user?.role === "admin" && (
          <div className="edit-wrapper">
            {editMode ? (
              <div className="edit-box">
                <input
                  type="text"
                  className="edit-input"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Enter new streaming URL"
                />
                <button
                  className="save-btn"
                  onClick={async () => {
                    const res = await fetch(`/api/posts/${id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ streamLink: newUrl }),
                    });

                    if (res.ok) {
                      alert("Stream Updated Successfully");
                      setEditMode(false);
                      setPost((prev) => ({ ...prev, streamLink: newUrl }));
                    } else {
                      alert("Error updating stream");
                    }
                  }}
                >
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="edit-btn"
                onClick={() => {
                  setNewUrl(post.streamLink);
                  setEditMode(true);
                }}
              >
                ✏️ Edit Stream
              </button>
            )}
          </div>
        )}


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
              <YouTubePlayer url={post.streamLink} title={post.title} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
