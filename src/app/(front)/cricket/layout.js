import React from "react";

export const metadata = {
    title: "buffstreams.us Cricket Matches - Live & Upcoming",
    description:
        "Watch all Cricket matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Cricket Matches - Live & Upcoming",
        description:
            "Watch all Cricket matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/cricket",
        images: [
            {
                url: "https://buffstreams.us/images/cricket-preview.jpg", // Replace with actual cricket image
                width: 1200,
                height: 630,
                alt: "Watch Cricket matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/cricket",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Cricket Matches - Live & Upcoming",
        url: "https://buffstreams.us/cricket",
        description:
            "Watch all Cricket matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Cricket Matches",
            url: "https://buffstreams.us/cricket",
            sport: "Cricket",
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
            url: "https://buffstreams.us/images/cricket-preview.jpg", // Cricket preview image
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
