import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

export const metadata: Metadata = {
	title: "LongStory",
	description: "A modern writing platform for long-form articles",
};

const norms = localFont({
	src: [
		{
			path: "../public/fonts/TTNorms-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/TTNorms-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/TTNorms-Bold.woff2",
			weight: "600",
			style: "normal",
		}
	],
	variable: "--font-norms",
	display: "swap",
})

export default function RootLayout({children}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
			<html lang="en">
				<body className={norms.className}>
					{children}
				</body>
			</html>
	);
}