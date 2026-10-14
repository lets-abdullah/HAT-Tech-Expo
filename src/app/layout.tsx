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
    icon: "/images/hat-logo.png",
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
        <link rel="icon" href="/images/hat-logo.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
