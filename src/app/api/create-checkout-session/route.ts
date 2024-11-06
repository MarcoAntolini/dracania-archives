import { createCheckoutSession } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { username } = await req.json();
	const origin = req.headers.get("origin");
	const sessionUrl = await createCheckoutSession({ username, origin: origin ?? "" });
	if (sessionUrl) {
		return NextResponse.json({ url: sessionUrl }, { status: 200 });
	} else {
		return NextResponse.json({ error: "Session URL is null" }, { status: 500 });
	}
}
