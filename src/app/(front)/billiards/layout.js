import React from "react";

export const metadata = {
    title: "buffstreams.us Billiards Matches - Live & Upcoming",
    description:
        "Watch all Billiards matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
    openGraph: {
        title: "buffstreams.us Billiards Matches - Live & Upcoming",
        description:
            "Watch all Billiards matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
        url: "https://buffstreams.us/billiards",
        images: [
            {
                url: "https://buffstreams.us/images/billiards-preview.jpg", // Replace with actual billiards image
                width: 1200,
                height: 630,
                alt: "Watch Billiards matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/billiards",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Billiards Matches - Live & Upcoming",
        url: "https://buffstreams.us/billiards",
        description:
            "Watch all Billiards matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Billiards Matches",
            url: "https://buffstreams.us/billiards",
            sport: "Billiards",
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
            url: "https://buffstreams.us/images/billiards-preview.jpg", // Billiards preview image
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
