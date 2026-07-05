import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artem-portfolio.layero.ru"),
  title: "Artem Suslov — Software Designer",
  description:
    "Software designer focused on B2C web and mobile products.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Artem Suslov — Software Designer",
    description: "Software designer focused on B2C web and mobile products.",
    siteName: "Artem Suslov",
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
