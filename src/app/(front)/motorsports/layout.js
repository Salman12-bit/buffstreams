import React from "react";

export const metadata = {
    title: "buffstreams.us Motorsports Matches - Live & Upcoming",
    description:
        "Watch all Motorsports events live and upcoming on Buffstreams. Stream races in HD with schedule updates and advanced filtering for your favorite drivers and teams.",
    openGraph: {
        title: "buffstreams.us Motorsports Matches - Live & Upcoming",
        description:
            "Watch all Motorsports events live and upcoming on Buffstreams. Stream races in HD with schedule updates and advanced filtering for your favorite drivers and teams.",
        url: "https://buffstreams.us/motorsports",
        images: [
            {
                url: "https://buffstreams.us/images/motorsports-preview.jpg", // Replace with actual motorsports image
                width: 1200,
                height: 630,
                alt: "Watch Motorsports events live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/motorsports",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Motorsports Matches - Live & Upcoming",
        url: "https://buffstreams.us/motorsports",
        description:
            "Watch all Motorsports events live and upcoming on Buffstreams. Stream races in HD with schedule updates and advanced filtering for your favorite drivers and teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Motorsports Events",
            url: "https://buffstreams.us/motorsports",
            sport: "Motorsports",
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
            url: "https://buffstreams.us/images/motorsports-preview.jpg", // Motorsports preview image
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
