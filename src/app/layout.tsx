import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const drakenFont = localFont({ src: "./DrakenFont.ttf" });

export const metadata: Metadata = {
	title: "Dracania Archives",
	icons: {
		icon: "https://dracania-archives.com/favicon.ico",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="https://dracania-archives.com/favicon.ico" />
			</head>
			<body className={`${drakenFont.className} pt-[74px] min-h-screen`}>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
