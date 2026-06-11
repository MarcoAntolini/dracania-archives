import Body from "@/components/body";
import Footer from "@/components/footer";
import { NavSidebar } from "@/components/nav-sidebar";
import { getMaintenanceMode } from "@/lib/maintenance-mode";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "../../public/styles/globals.css";
import Providers from "./providers";

const drakenFont = localFont({ src: "../../public/fonts/DrakenFont.ttf" });

export const metadata: Metadata = {
	metadataBase: siteConfig.appUrl ? new URL(siteConfig.appUrl) : undefined,
	title: siteConfig.appName,
	icons: {
		icon: absoluteUrl("/favicon.ico"),
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const isMaintenanceMode = await getMaintenanceMode({
		headers: headers(),
		cookies: cookies(),
	});

	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={`${drakenFont.className} dark min-h-screen scroll-smooth bg-custom-background text-white`}>
				<Providers>
					{siteConfig.features.analytics ? <Analytics /> : null}
					{isMaintenanceMode ? null : <NavSidebar />}
					<div className="flex min-h-screen w-full flex-col">
						<Body maintenanceMode={isMaintenanceMode}>{children}</Body>
						{isMaintenanceMode ? null : <Footer />}
					</div>
					<Toaster richColors />
				</Providers>
			</body>
		</html>
	);
}
