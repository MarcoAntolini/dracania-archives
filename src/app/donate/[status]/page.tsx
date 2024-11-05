"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DonationSuccessPage({
	params,
	searchParams,
}: {
	params: { status: string };
	searchParams: { sessionId: string };
}) {
	const status = params.status;
	const sessionId = searchParams.sessionId;

	const cookies = useCookies();

	const addDonation = useMutation(api.mutations.donations.addDonation);

	const [isLoading, setIsLoading] = useState(true);
	const [paymentStatus, setPaymentStatus] = useState<string | undefined>(undefined);

	useEffect(() => {
		const verifyPayment = async () => {
			const emailSent = cookies.get(`emailSent_${sessionId}`);
			if (status !== undefined && sessionId !== undefined && emailSent !== "true") {
				await fetch("/api/verify-payment", {
					method: "POST",
					body: JSON.stringify({ sessionId }),
				})
					.then((res) => res.json())
					.then(async (payment) => {
						if (payment.payment_status === "paid" && status === "success") {
							setIsLoading(false);
							setPaymentStatus("success");
							await addDonation({
								donationId: sessionId,
								username: payment.username,
								email: payment.email,
							});
							await fetch("/api/send-payment-email", {
								method: "POST",
							});
							cookies.set(`emailSent_${sessionId}`, "true", {
								expires: new Date(Date.now() + 1000 * 60 * 60),
							});
						} else {
							setIsLoading(false);
							setPaymentStatus("canceled");
						}
					});
			}
		};
		verifyPayment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, sessionId]);

	return (
		<div className="flex w-full flex-col items-center justify-center">
			{isLoading ? (
				<Loader2 className="mt-12 h-10 w-10 animate-spin" color="#cdb485" />
			) : (
				<>
					<Image
						src={paymentStatus === "success" ? "/images/game/heroes.jpg" : "/images/game/fire.jpg"}
						alt="Success"
						width={100}
						height={100}
						sizes="100vw"
						className="mx-auto min-w-full opacity-50"
					/>
					<div className="absolute top-[18rem] flex flex-col items-center justify-center gap-5 px-6 py-10 text-center md:px-10">
						{paymentStatus === "success" ? (
							<div className="flex flex-col items-center justify-center gap-5 rounded-lg p-5 md:bg-black/50">
								<h1 className="text-3xl font-bold text-custom-main">Donation Successfull</h1>
								<p className="text-xl text-white">Thank you hero for your contribution! 💖</p>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center gap-5 rounded-lg p-5 md:bg-black/50">
								<h1 className="text-3xl font-bold text-custom-main">Donation Canceled</h1>
								<p className="text-xl text-white">⚠️ Something went wrong. Please try again.</p>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
