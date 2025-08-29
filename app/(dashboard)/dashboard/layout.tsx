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
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
      <body className={`${geistSans.className} antialiased`}>
        <Navbar />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--accent)",
              color: "var(--foreground)",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "0.875rem",
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
            },
          }}
        />
        <div className="p-standard">{children}</div>
      </body>
    </html>
  );
}
