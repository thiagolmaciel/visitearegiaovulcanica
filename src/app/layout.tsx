import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal do Afiliado",
  description: "Portal do Afiliado",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative bg-none! bg-gray-200 ">
        <div className="h-screen flex items-center justify-center px-5">
        {children}
        <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
