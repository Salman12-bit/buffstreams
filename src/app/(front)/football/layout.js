import React from "react";

export const metadata = {
    title: "buffstreams.us Football Matches - Live & Upcoming",
    description:
        "Watch all Football matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Football Matches - Live & Upcoming",
        description:
            "Watch all Football matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/football",
        images: [
            {
                url: "https://buffstreams.us/images/football-preview.jpg", // Replace with actual football image
                width: 1200,
                height: 630,
                alt: "Watch Football matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/football",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Football Matches - Live & Upcoming",
        url: "https://buffstreams.us/football",
        description:
            "Watch all Football matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Football Matches",
            url: "https://buffstreams.us/football",
            sport: "Football",
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
            url: "https://buffstreams.us/images/football-preview.jpg", // Football preview image
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
