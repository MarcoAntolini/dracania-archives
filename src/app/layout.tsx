import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "DSO Database",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="https://dso-database-dun.vercel.app/favicon.ico" />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
