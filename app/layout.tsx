import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { DarkModeProvider } from "@/components/DarkModeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900 dark:bg-black dark:text-white`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before any paint — reads localStorage or system preference to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');}catch(e){}})();` }} />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-black dark:text-white">
        <DarkModeProvider>
          <NavBar />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
