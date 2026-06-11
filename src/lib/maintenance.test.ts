import { describe, expect, it } from "vitest";
import { getMaintenanceResponseType, isMaintenanceAllowedPath } from "./maintenance";

describe("maintenance route policy", () => {
	it.each(["/", "/?from=/items", "/.well-known/vercel/flags"])("allows %s during maintenance", (path) => {
		expect(isMaintenanceAllowedPath(path)).toBe(true);
	});

	it.each(["/_next/static/chunk.js", "/favicon.ico", "/images/game/banner.jpg", "/robots.txt"])(
		"allows static/internal asset %s during maintenance",
		(path) => {
			expect(isMaintenanceAllowedPath(path)).toBe(true);
		},
	);

	it.each(["/items", "/items/ranger", "/about", "/login", "/admin", "/donate/success?sessionId=abc"])(
		"blocks page route %s during maintenance",
		(path) => {
			expect(isMaintenanceAllowedPath(path)).toBe(false);
			expect(getMaintenanceResponseType(path)).toBe("redirect");
		},
	);

	it.each(["/api/save-username", "/api/create-checkout-session", "/trpc/example"])(
		"blocks API route %s with an unavailable response during maintenance",
		(path) => {
			expect(isMaintenanceAllowedPath(path)).toBe(false);
			expect(getMaintenanceResponseType(path)).toBe("unavailable");
		},
	);
});
