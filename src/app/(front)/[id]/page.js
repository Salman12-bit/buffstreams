import PostPage from "./postpage";

const getData = async (id) => {
  const res = await fetch(`${process.env.LIVE_LINK}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

export async function generateMetadata({ params }) {
  const post = await getData(params.id);

  if (!post) {
    return {
      title: "Match Not Found",
      description: "This match could not be found.",
      alternates: {
        canonical: "https://buffstreams.us/404",
      },
    };
  }

  return {
    title: post.title,
    description: "Watch live sports streams in HD quality. Enjoy fast, secure, and free live match streaming with real-time updates on BuffStreams.",
    openGraph: {
      title: post.title,
      description:"Watch live sports streams in HD quality. Enjoy fast, secure, and free live match streaming with real-time updates on BuffStreams.",
      url: `https://buffstreams.us/posts/${params.id}`,
      images: [
        {
          url: post.image || "/default.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `https://buffstreams.us/posts/${params.id}`,
    },
  };
}

export default function Page() {
  return <PostPage />;
}
