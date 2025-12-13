import React from "react";

export const metadata = {
    title: "buffstreams.us Billiards Matches - Live & Upcoming",
    description:
        "Watch all Billiards matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite players.",
    openGraph: {
        title: "buffstreams.us Billiards Matches - Live & Upcoming",
        description:
            "Watch all Billiards matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite players.",
        url: "https://buffstreams.us/billiards",
        images: [
            {
                url: "https://buffstreams.us/images/Billiards.webp",
                width: 1200,
                height: 630,
                alt: "Watch Billiards matches live on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/billiards",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Billiards Live Streams on Buffstreams",
        "url": "https://buffstreams.us/billiards",
        "description":
            "Billiards streaming page showing live and upcoming matches on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "Billiards"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/Billiards.webp",
                "width": 500,
                "height": 500
            }
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
