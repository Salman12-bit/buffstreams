import React from "react";

export const metadata = {
  title: "buffstreams.us Other Sports Matches - Live & Upcoming",
  description:
    "Watch all other sports matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite events.",
  openGraph: {
    title: "buffstreams.us Other Sports Matches - Live & Upcoming",
    description:
      "Watch all other sports matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite events.",
    url: "https://buffstreams.us/othermatches",
    images: [
      {
        url: "https://buffstreams.us/images/Others.webp", 
        width: 1200,
        height: 630,
        alt: "Watch other sports matches live and upcoming on Buffstreams in HD",
      },
    ],
  },
  alternates: {
    canonical: "https://buffstreams.us/othermatches",
  },
};

export default function Layout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Others Live Streams on Buffstreams",
    "url": "https://buffstreams.us/othermatches",
    "description":
      "Others streaming page showing live and upcoming matches on Buffstreams.",
    "about": {
      "@type": "Thing",
      "name": "Others"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Buffstreams",
      "logo": {
        "@type": "ImageObject",
        "url": "https://buffstreams.us/images/Others.webp",
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
