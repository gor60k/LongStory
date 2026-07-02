import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "LongStory",
	description: "A modern writing platform for long-form articles",
};

export default function RootLayout({children}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
			<html lang="en">
				<body>
					{children}
				</body>
			</html>
	);
}