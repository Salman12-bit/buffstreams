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
                url: "https://buffstreams.us/images/Hockey.webp", 
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
        "name": "Hockey Live Streams on Buffstreams",
        "url": "https://buffstreams.us/hockey",
        "description":
            "Hockey streaming page showing live and upcoming matches on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "Hockey"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/Hockey.webp",
                "width": 500,
                "height": 500
            }
        }
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
