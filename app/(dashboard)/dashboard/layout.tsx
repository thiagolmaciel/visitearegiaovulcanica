import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/dashboard/navbar";
import "./dashboard.css";
import { Toaster } from "sonner";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dashboard - Afiliado",
  description: "O portal de gestão dos afiliados",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased bg-gray-50`}>
        <Navbar />
        <Toaster
          position="top-center"
          richColors
        />
        <div className="p-standard pb-12 pt-8 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
