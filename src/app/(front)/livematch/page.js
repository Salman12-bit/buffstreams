import StreamsPage from "./StreamsPageClient";

export async function generateMetadata() {
  
  const baseUrl = process.env.LIVE_LINK || "https://buffstreams.us";

  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: "no-store",
  });

  const posts = await res.json();

  const livePost = posts.find((post) =>
    post.content?.toLowerCase().includes("livematch")
  );

  if (!livePost) {
    return {
      title: "No Live Match Available",
      description: "There is currently no live match available.",
    };
  }

  return {
    title: livePost.title,
    description: livePost.content,
    openGraph: {
      title: livePost.title,
      description: livePost.content,
      url: `${baseUrl}/livematch`,
    },
  };
}

export default function Page() {
  return <StreamsPage />;
}
