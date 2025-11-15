import React from "react";

export const metadata = {
    title: "buffstreams.us Hockey Matches - Live & Upcoming",
    description:
        "Watch all Hockey matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Hockey Matches - Live & Upcoming",
        description:
            "Watch all Hockey matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/hockey",
        images: [
            {
                url: "https://buffstreams.us/images/hockey-preview.jpg", // Replace with actual hockey image
                width: 1200,
                height: 630,
                alt: "Watch Hockey matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/hockey",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Hockey Matches - Live & Upcoming",
        url: "https://buffstreams.us/hockey",
        description:
            "Watch all Hockey matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Hockey Matches",
            url: "https://buffstreams.us/hockey",
            sport: "Hockey",
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
            url: "https://buffstreams.us/images/hockey-preview.jpg", // Hockey preview image
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
