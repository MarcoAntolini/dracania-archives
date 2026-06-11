export type MaintenanceResponseType = "allow" | "redirect" | "unavailable";

const FLAGS_DISCOVERY_PATH = "/.well-known/vercel/flags";
const INTERNAL_OR_STATIC_PREFIXES = ["/_next/", "/images/", "/fonts/", "/styles/"];
const FILE_EXTENSION_PATTERN = /\/[^/]+\.[^/]+$/;

function getPathname(pathOrUrl: string) {
	return new URL(pathOrUrl, "https://dracania.local").pathname;
}

export function isMaintenanceAllowedPath(pathOrUrl: string) {
	const pathname = getPathname(pathOrUrl);

	return (
		pathname === "/" ||
		pathname === FLAGS_DISCOVERY_PATH ||
		INTERNAL_OR_STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
		FILE_EXTENSION_PATTERN.test(pathname)
	);
}

export function getMaintenanceResponseType(pathOrUrl: string): MaintenanceResponseType {
	if (isMaintenanceAllowedPath(pathOrUrl)) {
		return "allow";
	}

	const pathname = getPathname(pathOrUrl);

	if (pathname.startsWith("/api/") || pathname.startsWith("/trpc")) {
		return "unavailable";
	}

	return "redirect";
}
