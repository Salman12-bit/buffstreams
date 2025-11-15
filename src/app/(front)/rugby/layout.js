import React from "react";

export const metadata = {
    title: "buffstreams.us Rugby Matches - Live & Upcoming",
    description:
        "Watch all Rugby matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Rugby Matches - Live & Upcoming",
        description:
            "Watch all Rugby matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/rugby",
        images: [
            {
                url: "https://buffstreams.us/images/rugby-preview.jpg",
                width: 1200,
                height: 630,
                alt: "Watch Rugby matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/rugby",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Rugby Matches - Live & Upcoming",
        url: "https://buffstreams.us/rugby",
        description:
            "Watch all Rugby matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Rugby Matches",
            url: "https://buffstreams.us/rugby",
            sport: "Rugby",
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
            url: "https://buffstreams.us/images/rugby-preview.jpg",
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
