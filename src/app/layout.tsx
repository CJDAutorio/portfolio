import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
	title: "CJ DAutorio",
	description: "CJ DAutorio's personal website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`antialiased`}
				id="root"
			>
				<SpeedInsights />
				<Analytics />
				{children}
			</body>
		</html>
	);
}
