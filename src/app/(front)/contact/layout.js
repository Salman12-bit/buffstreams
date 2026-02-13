export const metadata = {
    title: "Contact Us - BuffStreams",
    description: "Get in touch with the BuffStreams team. Reach out for support, inquiries, and feedback.",
    openGraph: {
        title: "Contact Us - BuffStream",
        description: "Have questions or need assistance? Contact the BuffStreams team for support, inquiries, and feedback.",
        url: "https://buffstreams.us/contact",
        images: [
            {
                url: "https://buffstreams.us/images/buffstream-contact.jpg",
                width: 1200,
                height: 630,
                alt: "Contact BuffStreams for support and inquiries",
            },
        ],
    },
};

export default function Layout({ children }) {
    return <>{children}</>;
}
