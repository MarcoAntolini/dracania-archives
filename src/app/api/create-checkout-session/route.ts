import { createCheckoutSession } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest, res: NextResponse) {
	const { username } = await req.json();
	const origin = req.headers.get("origin");
	const sessionUrl = await createCheckoutSession({ username, origin });
	if (sessionUrl) {
		return NextResponse.json({ url: sessionUrl }, { status: 200 });
	} else {
		return NextResponse.json({ error: "Session URL is null" }, { status: 500 });
	}
}
