import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CookiesProvider } from "next-client-cookies/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ConvexClientProvider from "./convex-client-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ConvexClientProvider>
			<CookiesProvider>
				<NuqsAdapter>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
						<SidebarProvider>{children}</SidebarProvider>
					</ThemeProvider>
				</NuqsAdapter>
			</CookiesProvider>
		</ConvexClientProvider>
	);
}
