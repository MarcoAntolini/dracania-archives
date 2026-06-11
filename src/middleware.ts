import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { availableClasses } from "./types/common/classes";

const isSignInPage = createRouteMatcher(["/login"]);
const isProtectedRoute = createRouteMatcher(["/user-settings", "/admin", "/admin/(.*)", "/owner", "/owner/(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin", "/admin/(.*)"]);
const isOwnerRoute = createRouteMatcher(["/owner", "/owner/(.*)"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
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

	const path = request.nextUrl.pathname;
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
