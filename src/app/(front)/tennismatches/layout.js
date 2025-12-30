import React from "react";

export const metadata = {
    title: "buffstreams.us Tennis Matches - Live & Upcoming",
    description:
        "Watch all Tennis matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
    openGraph: {
        title: "buffstreams.us Tennis Matches - Live & Upcoming",
        description:
            "Watch all Tennis matches live and upcoming on Buffstreams. Stream games in HD with schedule updates and advanced filtering for your favorite players.",
        url: "https://buffstreams.us/tennismatches",
        images: [
            {
                url: "https://buffstreams.us/images/Tennis.webp",
                width: 1200,
                height: 630,
                alt: "Watch Tennis matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/tennismatches",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Tennis Live Streams on Buffstreams",
        "url": "https://buffstreams.us/tennismatches",
        "description":
            "Tennis streaming page showing live and upcoming matches on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "Tennis"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/Tennis.webp",
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
