export const metadata = {
    title: "Buffstreams Login",
    description: "This is the login page for Buffstreams.",
    openGraph: {
        title: "Buffstreams Login",
        description: "Log in to access Buffstreams and start following live sports and streams.",
        url: "https://buffstreams.us/login", 
        images: [
            {
                url: "https://buffstreams.us/images/favicon.webp", 
                width: 1200,
                height: 630,
                alt: "Login to Buffstreams to follow live sports and streams",
            },
        ],
    },
};

export default function Layout({ children }) {
    return <>{children}</>;
}
