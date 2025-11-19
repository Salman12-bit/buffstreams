export const metadata = {
    title: "Buffstreams Register",
    description: "This is the register page for Buffstreams.",
    openGraph: {
        title: "Buffstreams Register",
        description: "Register to access Buffstreams and start following live sports and streams.",
        url: "https://buffstreams.us/register", 
        images: [
            {
                url: "https://buffstreams.us/images/favicon.webp", 
                width: 1200,
                height: 630,
                alt: "Register to Buffstreams to follow live sports and streams",
            },
        ],
    },
};

export default function Layout({ children }) {
    return <>{children}</>;
}
