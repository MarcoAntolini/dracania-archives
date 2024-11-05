import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { availableClasses } from "./types/common/classes";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	if (path.startsWith("/items/")) {
		const className = path.split("/")[2];
		if (className && !availableClasses.map((c) => c.commonName as string).includes(className)) {
			return NextResponse.redirect(new URL("/items", request.url));
		}
	}

	if (path.startsWith("/donate/")) {
		const status = path.split("/")[2];
		if (status && !["success", "canceled"].includes(status)) {
			return NextResponse.redirect(new URL("/donate", request.url));
		}
		const sessionId = request.nextUrl.searchParams.get("sessionId");
		if (!sessionId) {
			return NextResponse.redirect(new URL("/donate", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/donate/:status*", "/items/:className*"],
};
