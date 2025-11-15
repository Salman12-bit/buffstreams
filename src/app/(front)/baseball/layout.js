import React from "react";

export const metadata = {
    title: "buffstreams.us Baseball Matches - Live & Upcoming",
    description:
        "Watch all Baseball matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Baseball Matches - Live & Upcoming",
        description:
            "Watch all Baseball matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/baseball",
        images: [
            {
                url: "https://buffstreams.us/images/baseball-preview.jpg", 
                width: 1200,
                height: 630,
                alt: "Watch Baseball matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/baseball",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Baseball Matches - Live & Upcoming",
        url: "https://buffstreams.us/baseball",
        description:
            "Watch all Baseball matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Baseball Matches",
            url: "https://buffstreams.us/baseball",
            sport: "Baseball",
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
            url: "https://buffstreams.us/images/baseball-preview.jpg", // Baseball preview image
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
