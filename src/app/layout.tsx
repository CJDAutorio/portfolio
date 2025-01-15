import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Landing from "./Views/Landing";
import GrainyBorder from "./Components/GrainyBorder";
import { Analytics } from "@vercel/analytics/react"
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
  title: "CJ DAutorio",
  description: "CJ DAutorio's personal website",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <Landing className={'container mx-auto'} />
        <GrainyBorder />
        <Landing className={'container mx-auto'} />
      </body>
    </html>
  );
}
