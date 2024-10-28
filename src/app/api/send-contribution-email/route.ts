import { sendContributionEmail } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest, res: NextResponse) {
	const { type, class: className, name } = await req.json();
	await sendContributionEmail({ type, class: className, name });
	return NextResponse.json({ message: "Feedback sent" });
}
