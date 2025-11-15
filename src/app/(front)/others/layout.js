import React from "react";

export const metadata = {
  title: "buffstreams.us Other Sports Matches - Live & Upcoming",
  description:
    "Watch all other sports matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite events.",
  openGraph: {
    title: "buffstreams.us Other Sports Matches - Live & Upcoming",
    description:
      "Watch all other sports matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite events.",
    url: "https://buffstreams.us/others",
    images: [
      {
        url: "https://buffstreams.us/images/others-preview.jpg", // Replace with actual others image
        width: 1200,
        height: 630,
        alt: "Watch other sports matches live and upcoming on Buffstreams in HD",
      },
    ],
  },
  alternates: {
    canonical: "https://buffstreams.us/others",
  },
};

export default function Layout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "buffstreams.us Other Sports Matches - Live & Upcoming",
    url: "https://buffstreams.us/others",
    description:
      "Watch all other sports matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite events.",
    mainEntity: {
      "@type": "SportsEvent",
      name: "Other Sports Matches",
      url: "https://buffstreams.us/others",
      sport: "Other Sports",
      eventStatus: "https://schema.org/EventScheduled",
    },
    publisher: {
      "@type": "Organization",
      name: "Buffstreams",
      logo: {
        "@type": "ImageObject",
        url: "https://buffstreams.us/images/logo.png",
        width: 500,
        height: 500,
      },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://buffstreams.us/images/others-preview.jpg", // Others preview image
      width: 1200,
      height: 630,
    },
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
