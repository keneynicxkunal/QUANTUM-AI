import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QUANTUM - AI-Powered Search Engine",
  description: "Next-generation search engine powered by artificial intelligence. Experience the future of search with QUANTUM's intelligent results and real-time insights.",
  keywords: ["QUANTUM", "AI Search", "Search Engine", "Artificial Intelligence", "Web Search", "Next.js", "TypeScript"],
  authors: [{ name: "QUANTUM Team" }],
  openGraph: {
    title: "QUANTUM - The Future of Search",
    description: "AI-powered search engine with intelligent results and real-time insights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QUANTUM - The Future of Search",
    description: "AI-powered search engine with intelligent results and real-time insights",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
