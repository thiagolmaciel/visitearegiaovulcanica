import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/admin/navbar";
import "./admin.css";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dashboard - Administrador",
  description: "O portal de gestão administrativa",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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


