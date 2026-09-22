import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { MainNavbar } from "@/components/MainNavbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import { FloatingChatbot } from "@/components/FloatingChatbot";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], display: "swap", variable: "--font-syne" });

export const metadata: Metadata = {
  title: "InXfinia | AI Infrastructure",
  description: "End-to-end AI Infrastructure platform.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <LenisProvider>
          <MainNavbar />
          {children}
          <Footer />
          <FloatingChatbot />
          <ScrollToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
