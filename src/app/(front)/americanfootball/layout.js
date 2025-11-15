import React from "react";

export const metadata = {
    title: "buffstreams.us American Football Matches - Live & Upcoming",
    description:
        "Watch all American Football matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us American Football Matches - Live & Upcoming",
        description:
            "Watch all American Football matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/americanfootball",
        images: [
            {
                url: "https://buffstreams.us/images/americanfootball-preview.jpg",
                width: 1200,
                height: 630,
                alt: "Watch American Football matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/americanfootball",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "buffstreams.us American Football Matches - Live & Upcoming",
        url: "https://buffstreams.us/americanfootball",
        description:
            "Watch all American Football matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite teams.",
        mainEntity: {
            "@type": "SportsEvent",
            name: "American Football Matches",
            url: "https://buffstreams.us/americanfootball",
            sport: "American Football",
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
            url: "https://buffstreams.us/images/americanfootball-preview.jpg",
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
