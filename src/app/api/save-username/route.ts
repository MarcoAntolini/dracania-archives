import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	let ipAddress = req.headers.get("x-real-ip") as string;
	const forwardedFor = req.headers.get("x-forwarded-for") as string;
	if (!ipAddress && forwardedFor) {
		ipAddress = forwardedFor?.split(",").at(0) ?? "Unknown";
	}
	if (ipAddress === "::1") {
		ipAddress = "127.0.0.1";
	}
	return NextResponse.json({ message: "Username saved", success: true, ipAddress });
}
