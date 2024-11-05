import Body from "@/components/body";
import Footer from "@/components/footer";
import { NavSidebar } from "@/components/nav-sidebar";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "../../public/styles/globals.css";
import Providers from "./providers";

const drakenFont = localFont({ src: "../../public/fonts/DrakenFont.ttf" });

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
			<body className={`${drakenFont.className} dark min-h-screen scroll-smooth bg-custom-background text-white`}>
				<Providers>
					<Analytics />
					<NavSidebar />
					<div className="flex min-h-screen w-full flex-col">
						<Body>{children}</Body>
						<Footer />
					</div>
					<Toaster richColors />
				</Providers>
			</body>
		</html>
	);
}
