"use client";

import React, { useState } from "react";
import "./dashboard.css";
import { useRouter } from "next/navigation";

const buffDashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const title = e.target[0].value;
    const desc = e.target[1].value;
    const timeInput = e.target[2].value; 
    const matchDate = e.target[3].value; 
    const content = e.target[4].value;
    const streamLink = e.target[5].value;
    const file = e.target[6].files[0];

    
    const [hour, minute] = timeInput.split(":");
    let hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    hourNum = hourNum % 12 || 12;
    const time = `${hourNum}:${minute} ${ampm}`;

    
    const startTime = new Date(`${matchDate}T${timeInput}:00`);

    let imageUrl;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "bagwise");

      try {
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/di6r722sv/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!cloudinaryResponse.ok) {
          throw new Error("Failed to upload image.");
        }

        const cloudinaryData = await cloudinaryResponse.json();
        imageUrl = cloudinaryData.secure_url;
      } catch (error) {
        setError("Failed to upload image. Please try again.");
        setLoading(false);
        return;
      }
    }

    const payload = {
      title,
      desc,
      time,
      matchDate,
      content,
      streamLink,
      file: imageUrl,
      startTime,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        router.push("/");
      } else {
        const errorData = await res.text();
        setError(`Failed to create post: ${errorData}`);
      }
    } catch (err) {
      setError("An error occurred while submitting the form");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="left-section motivational-text">
          <h3>Welcome to Your Blogging Journey!</h3>
          <p>Hey there, future storyteller! 🌟</p>
          <p>
            Whether it's your first post or your hundredth, every time you
            write, you have the power to inspire, inform, and connect with
            people all over the world. This space is yours to share your voice,
            passions, and unique perspective.
          </p>
          <ul>
            <li>✍️ Every great blog starts with a single post.</li>
            <li>🌱 Your growth is a journey. Each article you write is a step toward becoming a stronger writer.</li>
            <li>🚀 Consistency is your superpower. Stay committed and watch your impact grow.</li>
          </ul>
          <p className="highlight">Let’s get blogging! 🎉</p>
        </div>

        <div className="right-section">
          <form onSubmit={handleSubmit} className="form">
            {error && <p className="error-message">{error}</p>}
            <div className="input-container">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" placeholder="title" required className="input" />
            </div>
            <div className="input-container">
              <label htmlFor="desc">Description</label>
              <input type="text" name="desc" placeholder="desc" required className="input" />
            </div>
            <div className="input-container">
              <label htmlFor="time">Time</label>
              <input type="time" name="time" placeholder="time" required className="input" />
            </div>
            <div className="input-container">
              <label htmlFor="matchDate">Match Date</label>
              <input type="date" name="matchDate" placeholder="date" required className="input" />
            </div>
            <div className="input-container">
              <label htmlFor="content">Content</label>
              <input type="text" name="content" placeholder="content" required className="input" />
            </div>
            <div className="input-container">
              <label htmlFor="streamLink">Stream Link</label>
              <input type="text" name="streamLink" placeholder="https://example.com/live" required className="input" />
            </div>

            <div className="input-container">
              <label htmlFor="file">Upload File</label>
              <input type="file" name="file" className="input" required />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Loading..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default buffDashboard;
