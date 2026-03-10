import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="oMZXDI1wVbxlIA9uS9BtkM9sorkjaO68P_GXgLyBJYI"
        />
        <link rel="icon" type="image/png" href="/favicon.webp" />
      </head>

      <body className={inter.className}>


        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RM7JYV2R97"
          strategy="afterInteractive"
        />

        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RM7JYV2R97');
          `}
        </Script> */}


        <Script
          src="//d1zhmd1pxxxajf.cloudfront.net/?dmhzd=1230539"
        />

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