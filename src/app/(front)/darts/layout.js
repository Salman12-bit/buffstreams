import React from "react";

export const metadata = {
    title: "buffstreams.us Darts Matches - Live & Upcoming",
    description:
        "Watch all Darts matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
    openGraph: {
        title: "buffstreams.us Darts Matches - Live & Upcoming",
        description:
            "Watch all Darts matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
        url: "https://buffstreams.us/darts",
        images: [
            {
                url: "https://buffstreams.us/images/darts-preview.jpg", // Replace with actual darts image
                width: 1200,
                height: 630,
                alt: "Watch Darts matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/darts",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Darts Matches - Live & Upcoming",
        url: "https://buffstreams.us/darts",
        description:
            "Watch all Darts matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Darts Matches",
            url: "https://buffstreams.us/darts",
            sport: "Darts",
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
            url: "https://buffstreams.us/images/darts-preview.jpg", // Darts preview image
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
