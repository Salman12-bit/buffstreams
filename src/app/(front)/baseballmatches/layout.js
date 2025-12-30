import React from "react";

export const metadata = {
    title: "buffstreams.us Baseball Matches - Live & Upcoming",
    description:
        "Watch all Baseball matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Baseball Matches - Live & Upcoming",
        description:
            "Watch all Baseball matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/baseballmatches",
        images: [
            {
                url: "https://buffstreams.us/images/Baseball.webp",
                width: 1200,
                height: 630,
                alt: "Watch Baseball matches live on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/baseballmatches",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Baseball Live Streams on Buffstreams",
        "url": "https://buffstreams.us/baseballmatches",
        "description":
            "Baseball streaming page showing live and upcoming games on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "Baseball"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/Baseball.webp",
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
