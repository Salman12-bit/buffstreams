import React from "react";

export const metadata = {
    title: "buffstreams.us Fight Matches - Live & Upcoming",
    description:
        "Watch all Fight matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite fighters.",
    openGraph: {
        title: "buffstreams.us Fight Matches - Live & Upcoming",
        description:
            "Watch all Fight matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite fighters.",
        url: "https://buffstreams.us/fight",
        images: [
            {
                url: "https://buffstreams.us/images/fight-preview.jpg", // Replace with actual fight image
                width: 1200,
                height: 630,
                alt: "Watch Fight matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/fight",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Fight Matches - Live & Upcoming",
        url: "https://buffstreams.us/fight",
        description:
            "Watch all Fight matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite fighters.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Fight Matches",
            url: "https://buffstreams.us/fight",
            sport: "Fight",
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
            url: "https://buffstreams.us/images/fight-preview.jpg", // Fight preview image
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
