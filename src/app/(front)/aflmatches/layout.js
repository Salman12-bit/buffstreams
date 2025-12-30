import React from "react";

export const metadata = {
    title: "buffstreams.us AFL Matches - Live & Upcoming Games",
    description:
        "Watch all AFL matches live, upcoming, and 24/7 on Buffstreams. Enjoy HD streaming, schedule updates, and advanced filtering for your favorite teams and players.",
    openGraph: {
        title: "buffstreams.us AFL Matches - Live & Upcoming Games",
        description:
            "Watch all AFL matches live, upcoming, and 24/7 on Buffstreams. Enjoy HD streaming, schedule updates, and advanced filtering for your favorite teams and players.",
        url: "https://buffstreams.us/aflmatches",
        images: [
            {
                url: "https://buffstreams.us/images/AFL.webp",
                width: 1200,
                height: 630,
                alt: "Watch AFL matches live and upcoming on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/aflmatches",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "AFL Live Streams on Buffstreams",
        "url": "https://buffstreams.us/aflmatches",
        "description":
            "AFL streaming page showing live and upcoming Australian Football League games on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "Australian Football League"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/AFL.webp",
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
