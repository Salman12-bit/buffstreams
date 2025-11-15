import React from "react";

export const metadata = {
    title: "buffstreams.us Basketball Matches - Live & Upcoming",
    description:
        "Watch all Basketball matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Basketball Matches - Live & Upcoming",
        description:
            "Watch all Basketball matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/basketball",
        images: [
            {
                url: "https://buffstreams.us/images/basketball-preview.jpg", // Replace with actual basketball image
                width: 1200,
                height: 630,
                alt: "Watch Basketball matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/basketball",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Basketball Matches - Live & Upcoming",
        url: "https://buffstreams.us/basketball",
        description:
            "Watch all Basketball matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Basketball Matches",
            url: "https://buffstreams.us/basketball",
            sport: "Basketball",
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
            url: "https://buffstreams.us/images/basketball-preview.jpg", // Basketball preview image
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
