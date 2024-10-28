import { sendPaymentEmail } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	await sendPaymentEmail();
	return NextResponse.json({ message: "Email sent", success: true });
}
