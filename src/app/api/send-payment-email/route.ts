import { sendPaymentEmail } from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST() {
	await sendPaymentEmail();
	return NextResponse.json({ message: "Email sent", success: true });
}
