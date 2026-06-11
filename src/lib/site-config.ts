const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";

export const siteConfig = {
	appUrl,
	appName: "Dracania Archives",
	assetBaseUrl: process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "") ?? "",
	emailDomain: process.env.EMAIL_DOMAIN ?? "localhost",
	emails: {
		feedback: process.env.EMAIL_FEEDBACK ?? `feedback@${process.env.EMAIL_DOMAIN ?? "localhost"}`,
		contributor: process.env.EMAIL_CONTRIBUTOR ?? `contributor@${process.env.EMAIL_DOMAIN ?? "localhost"}`,
		donations: process.env.EMAIL_DONATIONS ?? `donations@${process.env.EMAIL_DOMAIN ?? "localhost"}`,
	},
	features: {
		analytics: process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === "true",
		posthog: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
		email: process.env.ENABLE_EMAIL !== "false",
	},
} as const;

export function absoluteUrl(path = "/"): string {
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path;
	}

	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return appUrl ? `${appUrl}${normalizedPath}` : normalizedPath;
}

export function itemImagePath(imageName: string, size: "full" | "thumb" = "full"): string {
	const folder = size === "thumb" ? "thumbs" : "";
	return folder
		? `/images/db/items/${folder}/${imageName}.png`
		: `/images/db/items/${imageName}.png`;
}
