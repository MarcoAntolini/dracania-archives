import { verifyPayment } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest, res: NextResponse) {
	const { sessionId } = await req.json();
	const payment = await verifyPayment({ sessionId });
	if (payment) {
		return NextResponse.json(payment, { status: 200 });
	} else {
		return NextResponse.json({ error: "Payment not found" }, { status: 404 });
	}
}
