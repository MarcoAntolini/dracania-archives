import { verifyPayment } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { sessionId } = await req.json();
	const payment = await verifyPayment({ sessionId });
	if (payment) {
		return NextResponse.json(payment, { status: 200 });
	} else {
		return NextResponse.json({ error: "Payment not found" }, { status: 404 });
	}
}
