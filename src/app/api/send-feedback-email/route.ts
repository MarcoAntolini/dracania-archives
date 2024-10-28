import { sendFeedbackEmail } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest, res: NextResponse) {
	const { feedback, email } = await req.json();
	await sendFeedbackEmail({ feedback, email });
	return NextResponse.json({ message: "Feedback sent" });
}
