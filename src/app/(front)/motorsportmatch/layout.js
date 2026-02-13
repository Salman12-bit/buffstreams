import React from "react";

export const metadata = {
    title: "buffstreams.us Motorsports Matches - Live & Upcoming",
    description:
        "Watch all Motorsports events live and upcoming on Buffstreams. Stream races in HD with schedule updates and advanced filtering for your favorite drivers and teams.",
    openGraph: {
        title: "buffstreams.us Motorsports Matches - Live & Upcoming",
        description:
            "Watch all Motorsports events live and upcoming on Buffstreams. Stream races in HD with schedule updates and advanced filtering for your favorite drivers and teams.",
        url: "https://buffstreams.us/motorsportmatch",
        images: [
            {
                url: "https://buffstreams.us/images/Motorsports.webp", 
                width: 1200,
                height: 630,
                alt: "Watch Motorsports events live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/motorsportmatch",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Motor Sports Live Streams on Buffstreams",
        "url": "https://buffstreams.us/motorsportmatch",
        "description":
            "Motor Sports streaming page showing live and upcoming matches on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "Motor Sports"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/Motorsports.webp",
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
