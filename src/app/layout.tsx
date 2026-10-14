import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAT Tech Expo 2026 | Redefining Technology, Building the Future",
  description:
    "A premier business-focused technology expo for Multan and the surrounding region, organized by HAT Tech Media. Bringing together executives, companies, universities, and students.",
  keywords: [
    "HAT Tech Expo",
    "Tech Expo Multan",
    "HAT Tech Media",
    "Technology Conference",
    "Pakistan Tech Expo",
    "Student Tech Projects",
    "B2B Matchmaking",
    "Job Fair",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
