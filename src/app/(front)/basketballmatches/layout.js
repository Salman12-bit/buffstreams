import React from "react";

export const metadata = {
    title: "buffstreams.us Basketball Matches - Live & Upcoming",
    description:
        "Watch all Basketball matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us Basketball Matches - Live & Upcoming",
        description:
            "Watch all Basketball matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/basketballmatches",
        images: [
            {
                url: "https://buffstreams.us/images/Basketball.webp",
                width: 1200,
                height: 630,
                alt: "Watch Basketball matches live on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/basketballmatches",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Basketball Live Streams on Buffstreams",
        "url": "https://buffstreams.us/basketballmatches",
        "description":
            "Basketball streaming page showing live and upcoming games on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "Basketball"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/Basketball.webp",
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
