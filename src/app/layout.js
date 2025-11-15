import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <meta name="google-site-verification" content="QY_TMPPlZuR_oQAF0JPwngL9VzO3wwLFykte--_fgfM" />
        <link rel="icon" type="image/png" href="/favicon.webp" />
      </head>

      <body className={inter.className}>
        <AuthProvider>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
