import React from "react";

export const metadata = {
    title: "buffstreams.us AFL Matches - Live & Upcoming Games",
    description:
        "Watch all AFL matches live, upcoming, and 24/7 on Buffstreams. Enjoy HD streaming, schedule updates, and advanced filtering for your favorite teams and players.",
    openGraph: {
        title: "buffstreams.us AFL Matches - Live & Upcoming Games",
        description:
            "Watch all AFL matches live, upcoming, and 24/7 on Buffstreams. Enjoy HD streaming, schedule updates, and advanced filtering for your favorite teams and players.",
        url: "https://buffstreams.us/afl",
        images: [
            {
                url: "https://buffstreams.us/images/afl-preview.jpg",
                width: 1200,
                height: 630,
                alt: "Watch AFL matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/afl",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "buffstreams.us AFL Matches - Live & Upcoming Games",
        "url": "https://buffstreams.us/afl",
        "description":
            "Watch all AFL matches live, upcoming, and 24/7 on Buffstreams. Enjoy HD streaming, schedule updates, and advanced filtering for your favorite teams and players.",
        "mainEntity": {
            "@type": "SportsEvent",
            "name": "AFL Matches",
            "url": "https://buffstreams.us/afl",
            "sport": "Australian Football League",
            "eventStatus": "https://schema.org/EventScheduled",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/logo.png",
                "width": 500,
                "height": 500,
            },
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://buffstreams.us/images/afl-preview.jpg",
            "width": 1200,
            "height": 630,
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
