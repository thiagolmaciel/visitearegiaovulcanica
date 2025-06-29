import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
      <body className="min-h-[100vh] relative">
        <Navbar />
        <div className="pb-[52rem] sm:pb-[22rem]">
        {children}
        <SpeedInsights />
        </div>
        <Footer />
      </body>
    </html>
  );
}
