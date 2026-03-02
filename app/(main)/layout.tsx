import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";
import { Toaster } from "@/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "VisiteRV",
  description: "Te ajudando a desbravar essa região!",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "VisiteRV",
    description: "Te ajudando a desbravar essa região!",
    url: defaultUrl,
    siteName: "VisiteRV",
    images: [
      {
        url: "/logo.png",
        width: 663,
        height: 369,
        alt: "VisiteRV Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VisiteRV",
    description: "Te ajudando a desbravar essa região!",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preload" as="image" href="/regiao-vulcanica.jpg" />
        <link rel="preload" as="image" href="/house.jpg" />
        <link rel="preload" as="image" href="/logo.png" />
      </head>
      <body className="min-h-[100vh] flex flex-col">
        <Navbar />
        <div className="flex justify-center flex-1">
        {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
