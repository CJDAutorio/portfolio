import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Landing from "./Views/Landing";
import { ThreeJSScene } from "./Components/ThreeJSScene";
import { Analytics } from "@vercel/analytics/react";
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
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50`}
			>
				<Analytics />
				<ThreeJSScene />
				<div className="z-10">
					<Landing className={"container mx-auto"} />
				</div>
			</body>
		</html>
	);
}
