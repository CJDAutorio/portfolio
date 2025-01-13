import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import Landing from "./Views/Landing";

import "./globals.css";

Amplify.configure(outputs);

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
        <Landing />
      </body>
    </html>
  );
}
