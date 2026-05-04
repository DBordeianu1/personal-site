import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Daniela Bordeianu",
    template: "%s | Daniela Bordeianu",
  },
  description:
    "Personal site and portfolio of Daniela Bordeianu",
  openGraph: {
    title: "Daniela Bordeianu",
    description:
      "Personal site and portfolio of Daniela Bordeianu",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "photos/from-gibraltar.png",
        width: 1200,
        height: 630,
        alt: "Daniela Bordeianu Portfolio Preview",
      },
    ],
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900`}
    >
      <body className="flex min-h-screen flex-col bg-white text-neutral-900">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
