export const metadata = {
    title: "Buffstreams Dashboard",
    description: "Access your personal Buffstreams dashboard. Manage live streams, track favorite sports, and customize your experience.",
    openGraph: {
        title: "Buffstreams Dashboard",
        description: "Explore your Buffstreams dashboard to manage live streams, view match updates, and personalize your sports tracking.",
        url: "https://buffstreams.us/dashboard",
        images: [
            {
                url: "https://buffstreams.us/images/favicon.webp", 
                width: 1200,
                height: 630,
                alt: "View your personalized Buffstreams dashboard to track live sports and matches",
            },
        ],
    },
};

export default function Layout({ children }) {
    return <>{children}</>;
}
