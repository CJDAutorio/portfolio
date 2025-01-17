import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThreeJSScene } from "./Components/ThreeJSScene";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Base from "./Views/Base";

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
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-300`}
			>
				<Analytics />
				<div className="z-10 absolute top-12 right-40">
					<h1 className="font-serif font-bold text-left text-6xl tracking-wider">CJ D&apos;Autorio</h1>
				</div>
				<div className="absolute w-screen h-screen flex justify-start items-end">
					<div
						className="
							z-20
							relative
							container
							w-full
							md:w-2/3
							py-6
							mx-8
							my-12
							backdrop-blur-sm
							drop-shadow-md
							bg-slate-200/30
							flex
							justify-start
							items-end
							hover:backdrop-blur-md
							transition-all
						"
					>
						<Base />
					</div>
				</div>
				<div className="z-0 pointer-events-none absolute overflow-hidden h-screen w-screen m-0 p-0">
					<ThreeJSScene />
				</div>
			</body>
		</html>
	);
}
