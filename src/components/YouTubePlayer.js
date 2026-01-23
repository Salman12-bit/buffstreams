"use client";
import { useState } from "react";

export default function YouTubePlayer({ url, title }) {
    const [failed, setFailed] = useState(false);

    if (!url) return null;


    if (failed) {
        return (
            <div style={{ color: "white", padding: "20px", textAlign: "center" }}>
                <h3>⚠ Video can't be embedded</h3>
                <a
                    href={url.replace("/embed/", "/watch?v=")}
                    target="_blank"
                    style={{ color: "#4ade80", fontSize: "18px", textDecoration: "underline" }}
                >
                    ▶ Watch on YouTube
                </a>
            </div>
        );
    }

    return (
        <iframe
            src={url}
            title={title}
            className="stream-iframe"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setFailed(true)}
        ></iframe>
    );
} 