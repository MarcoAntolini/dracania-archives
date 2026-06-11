import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "../convex/_generated/api";
import { getMaintenanceMode } from "./lib/maintenance-mode";
import { getMaintenanceResponseType } from "./lib/maintenance";
import { availableClasses } from "./types/common/classes";

const isSignInPage = createRouteMatcher(["/login"]);
const isProtectedRoute = createRouteMatcher(["/user-settings", "/admin", "/admin/(.*)", "/owner", "/owner/(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin", "/admin/(.*)"]);
const isOwnerRoute = createRouteMatcher(["/owner", "/owner/(.*)"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
	const path = request.nextUrl.pathname;
	const isMaintenanceMode = await getMaintenanceMode({
		headers: request.headers,
		cookies: request.cookies,
	});
	const maintenanceResponseType = isMaintenanceMode ? getMaintenanceResponseType(request.nextUrl.href) : "allow";

	if (maintenanceResponseType === "unavailable") {
		return NextResponse.json(
			{ error: "Dracania Archives is temporarily unavailable while maintenance is in progress." },
			{
				status: 503,
				headers: {
					"Cache-Control": "no-store",
					"Retry-After": "3600",
					"X-Robots-Tag": "noindex, nofollow",
				},
			},
		);
	}

	if (maintenanceResponseType === "redirect") {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		url.searchParams.set("from", path);

		const response = NextResponse.redirect(url);
		response.headers.set("Cache-Control", "no-store");
		response.headers.set("X-Robots-Tag", "noindex, nofollow");

		return response;
	}

	if (!convexAuth.isAuthenticated()) {
		if (isProtectedRoute(request)) {
			return nextjsMiddlewareRedirect(request, "/login");
		}
	} else if (convexAuth.isAuthenticated()) {
		if (isSignInPage(request)) {
			return nextjsMiddlewareRedirect(request, "/user-settings");
		}
		const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
		const token = await convexAuth.getToken();
		if (token) {
			client.setAuth(token);
		}
		const currentUser = await client.query(api.queries.users.getCurrentUser);
		if (isAdminRoute(request) && currentUser?.role !== "admin" && currentUser?.role !== "owner") {
			return nextjsMiddlewareRedirect(request, "/unauthorized");
		}
		if (isOwnerRoute(request) && currentUser?.role !== "owner") {
			return nextjsMiddlewareRedirect(request, "/unauthorized");
		}
	}

	if (path.startsWith("/items/")) {
		const className = path.split("/")[2];
		if (className && !availableClasses.map((c) => c.commonName as string).includes(className)) {
			return nextjsMiddlewareRedirect(request, "/items");
		}
	}
	if (path.startsWith("/donate/")) {
		const status = path.split("/")[2];
		if (status && !["success", "canceled"].includes(status)) {
			return nextjsMiddlewareRedirect(request, "/donate");
		}
		const sessionId = request.nextUrl.searchParams.get("sessionId");
		if (!sessionId) {
			return nextjsMiddlewareRedirect(request, "/donate");
		}
	}
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
