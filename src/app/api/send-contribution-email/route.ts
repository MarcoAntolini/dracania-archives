import { sendContributionEmail } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { type, class: className, name } = await req.json();
	await sendContributionEmail({ type, class: className, name });
	return NextResponse.json({ message: "Feedback sent" });
}
