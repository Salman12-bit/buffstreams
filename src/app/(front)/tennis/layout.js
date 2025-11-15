import React from "react";

export const metadata = {
    title: "buffstreams.us Tennis Matches - Live & Upcoming",
    description:
        "Watch all Tennis matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
    openGraph: {
        title: "buffstreams.us Tennis Matches - Live & Upcoming",
        description:
            "Watch all Tennis matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
        url: "https://buffstreams.us/tennis",
        images: [
            {
                url: "https://buffstreams.us/images/tennis-preview.jpg", // Replace with actual tennis image
                width: 1200,
                height: 630,
                alt: "Watch Tennis matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/tennis",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us Tennis Matches - Live & Upcoming",
        url: "https://buffstreams.us/tennis",
        description:
            "Watch all Tennis matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "Tennis Matches",
            url: "https://buffstreams.us/tennis",
            sport: "Tennis",
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
            url: "https://buffstreams.us/images/tennis-preview.jpg", // Tennis preview image
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
