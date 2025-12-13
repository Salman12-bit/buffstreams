import React from "react";

export const metadata = {
  title: "buffstreams.us Golf Matches - Live & Upcoming",
  description:
    "Watch all Golf matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
  openGraph: {
    title: "buffstreams.us Golf Matches - Live & Upcoming",
    description:
      "Watch all Golf matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
    url: "https://buffstreams.us/golf",
    images: [
      {
        url: "https://buffstreams.us/images/Golf.webp", 
        width: 1200,
        height: 630,
        alt: "Watch Golf matches live and upcoming on Buffstreams in HD",
      },
    ],
  },
  alternates: {
    canonical: "https://buffstreams.us/golf",
  },
};

export default function Layout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Golf Live Streams on Buffstreams",
    "url": "https://buffstreams.us/golf",
    "description":
      "Golf streaming page showing live and upcoming matches on Buffstreams.",
    "about": {
      "@type": "Thing",
      "name": "Golf"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Buffstreams",
      "logo": {
        "@type": "ImageObject",
        "url": "https://buffstreams.us/images/Golf.webp",
        "width": 500,
        "height": 500
      }
    }
  };

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
