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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
