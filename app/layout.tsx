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
  title: "Lost & Found Hub | Temukan Barang Hilang Anda",
  description:
    "Platform untuk melaporkan dan mencari barang hilang di tempat umum seperti kampus, terminal, taman, dan area publik lainnya.",
  keywords:
    "barang hilang, lost and found, lapor barang hilang, cari barang hilang, lost items, found items",
  authors: [
    { name: "Lost & Found Hub Team" },
    { name: "Aulia Luthfi Hakim" },
    { name: "Sugeng Aldi Widodo" },
    { name: "Sorijul Munir" },
  ],
  openGraph: {
    title: "Lost & Found Hub | Temukan Barang Hilang Anda",
    description:
      "Platform untuk melaporkan dan mencari barang hilang di tempat umum seperti kampus, terminal, taman, dan area publik lainnya.",
    url: "https://lostandfoundhub.com",
    siteName: "Lost & Found Hub",
    images: [
      {
        url: "/images/lost-found-hub-og.jpg",
        width: 1200,
        height: 630,
        alt: "Lost & Found Hub Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lost & Found Hub | Temukan Barang Hilang Anda",
    description:
      "Platform untuk melaporkan dan mencari barang hilang di tempat umum",
    images: ["/images/lost-found-hub-twitter.jpg"],
  },
  alternates: {
    canonical: "https://lostandfoundhub.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
