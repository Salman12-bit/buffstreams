import React from "react";

export const metadata = {
    title: "buffstreams.us American Football Matches - Live & Upcoming",
    description:
        "Watch all American Football matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite teams.",
    openGraph: {
        title: "buffstreams.us American Football Matches - Live & Upcoming",
        description:
            "Watch all American Football matches live and upcoming on Buffstreams. Stream games in HD with advanced filtering for your favorite teams.",
        url: "https://buffstreams.us/americanfootballmatches",
        images: [
            {
                url: "https://buffstreams.us/images/AmericanFootball.webp",
                width: 1200,
                height: 630,
                alt: "Watch American Football matches live on Buffstreams in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/americanfootballmatches",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "American Football Live Streams on Buffstreams",
        "url": "https://buffstreams.us/americanfootballmatches",
        "description":
            "American Football streaming page showing live and upcoming games on Buffstreams.",
        "about": {
            "@type": "Thing",
            "name": "American Football"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/images/AmericanFootball.webp",
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
