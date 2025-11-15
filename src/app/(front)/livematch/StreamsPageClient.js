"use client";

import "./live.css";
import { useEffect, useState } from "react";

export default function StreamsPage() {
    const [data, setData] = useState([]);
    const [err, setErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/posts", { cache: "no-store" });
            const json = await res.json();
            setData(json);
            setErr(false);
        } catch (error) {
            console.log("Error:", error);
            setErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const liveMatches = data.filter((post) =>
        post.content?.toLowerCase().includes("livematch")
    );

    return (
        <section className="live-page">
            {isLoading ? (
                <p>Loading...</p>
            ) : err ? (
                <p>Error loading streams.</p>
            ) : liveMatches.length === 0 ? (
                <p className="message">No live matches available right now.</p>
            ) : (
                liveMatches.map((post, index) => (
                    <div className="stream-card" key={post._id}>
                        <div className="stream-count">Stream {index + 1}</div>

                        <h3 className="stream-title">{post.title}</h3>
                        <p className="stream-sub">🔥 Live Match Stream</p>

                        <div className="player-wrapper">
                            <iframe
                                src={post.streamLink}
                                allowFullScreen
                                allow="autoplay; fullscreen"
                            ></iframe>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}
