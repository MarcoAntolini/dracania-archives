"use client";

import { siteConfig } from "@/lib/site-config";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined" && siteConfig.features.posthog) {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
		person_profiles: "always",
	});
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
	if (!siteConfig.features.posthog) {
		return <>{children}</>;
	}

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
