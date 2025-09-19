import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/main/footer";
import Navbar from "@/components/main/navbar";

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
      <body className="min-h-[100vh] relative">
        <Navbar />
        <div className="flex justify-center pb-[40rem] sm:pb-[18rem]">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
