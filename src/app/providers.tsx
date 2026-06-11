import ConvexClientProvider from "@/components/providers/convex-client-provider";
import { CSPostHogProvider } from "@/components/providers/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { CookiesProvider } from "next-client-cookies/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ConvexAuthNextjsServerProvider>
			<CSPostHogProvider>
				<CookiesProvider>
					<NuqsAdapter>
						<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
							<SidebarProvider>
								<ConvexClientProvider>{children}</ConvexClientProvider>
							</SidebarProvider>
						</ThemeProvider>
					</NuqsAdapter>
				</CookiesProvider>
			</CSPostHogProvider>
		</ConvexAuthNextjsServerProvider>
	);
}
