import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";


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
        <div className="pb-[40rem] sm:pb-[18rem]">
        {children}
        <SpeedInsights />
        </div>
        <Footer />
      </body>
    </html>
  );
}
