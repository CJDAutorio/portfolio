import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	title: "CJ DAutorio",
	description: "CJ DAutorio's personal website",
};

export const geist = Geist({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-geist'
});

export const sourceSerif4 = Source_Serif_4({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-source-serif-4'
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`antialiased ${geist.variable} ${sourceSerif4.variable}`}
				id="root"
			>
				<SpeedInsights />
				<Analytics />
				{children}
			</body>
		</html>
	);
}
