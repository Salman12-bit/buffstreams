export const metadata = {
    title: "Buffstreams SignUp",
    description: "This is the SignUp page for Buffstreams.",
    openGraph: {
        title: "Buffstreams SignUp",
        description: "SignUp to access Buffstreams and start following live sports and streams.",
        url: "https://buffstreams.us/signup", 
        images: [
            {
                url: "https://buffstreams.us/images/favicon.webp", 
                width: 1200,
                height: 630,
                alt: "SignUp to Buffstreams to follow live sports and streams",
            },
        ],
    },
};

export default function Layout({ children }) {
    return <>{children}</>;
}
