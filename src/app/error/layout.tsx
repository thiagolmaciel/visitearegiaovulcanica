import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata: Metadata = {
  title: "Erro!",
  description: "Erro!",
};

export default function NullLayout({
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
