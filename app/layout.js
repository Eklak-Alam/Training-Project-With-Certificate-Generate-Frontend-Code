import "./globals.css";
import { ApiProvider } from "@/context/api-context";
import Head from "next/head";
import { Inter } from 'next/font/google';
import Footer from "@/components/Fotter";
import Navbar from "@/components/Navbar";

// Optimize fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata = {
  title: "Balaji Shikshan Sansthan - Student Management System",
  description: "Comprehensive admin portal for managing student training records and certificates",
  keywords: "student management, training certificates, Balaji Shikshan, LIC training",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph / Social Meta */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://balajitraining.in/" />
        <meta property="og:image" content="/logo2.webp" />
      </Head>
      
      <body className="">
        <ApiProvider>
            <Navbar />
              {children}
            <Footer />
        </ApiProvider>
      </body>
    </html>
  );
}
