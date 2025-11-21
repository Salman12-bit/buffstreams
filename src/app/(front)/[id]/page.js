"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
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
      setPost(data);
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.desc}</p>

      {post?.file && <img src={post.file} alt={post.title} />}

      <p>Time: {post?.time}</p>
    </div>
  );
}
