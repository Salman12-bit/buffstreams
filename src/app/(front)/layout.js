import React from 'react';

export const metadata = {
    title: "Buffstreams: Free HD Live NFL, NBA, UFC & WWE Streaming",
    description:
        "Stream live sports in HD for free on Buffstreams! Watch NFL, NBA, UFC, WWE, Soccer, Boxing & more with a smooth, user-friendly interface.",
    openGraph: {
        title: "Buffstreams: Free HD Live NFL, NBA, UFC & WWE Streaming",
        description:
            "Stream live sports in HD for free on Buffstreams! Watch NFL, NBA, UFC, WWE, Soccer, Boxing & more with a smooth, user-friendly interface.",
        url: "https://buffstreams.us/",
        images: [
            {
                url: "https://buffstreams.us/images/preview.jpg",
                width: 1200,
                height: 630,
                alt: "Buffstreams - Watch NFL, NBA, UFC, WWE live in HD",
            },
        ],
    },
    alternates: {
        canonical: "https://buffstreams.us/",
    },
};

export default function Layout({ children }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Buffstreams: Free HD Live NFL, NBA, UFC & WWE Streaming",
        "url": "https://buffstreams.us/",
        "description":
            "Stream live sports in HD for free on Buffstreams! Watch NFL, NBA, UFC, WWE, Soccer, Boxing & more with a smooth, user-friendly interface.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://buffstreams.us/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Buffstreams",
            "logo": {
                "@type": "ImageObject",
                "url": "https://buffstreams.us/favicon.webp",
                "width": 500,
                "height": 500,
            },
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "https://buffstreams.us/images/preview.jpg",
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
