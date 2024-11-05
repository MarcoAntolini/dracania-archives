"use client";

import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function DonatePage() {
	const router = useRouter();
	const cookies = useCookies();

	const handleDonate = async () => {
		await fetch("/api/create-checkout-session", {
			method: "POST",
			body: JSON.stringify({ username: cookies.get("username") }),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.url) {
					router.push(response.url);
				} else {
					toast.error("Something went wrong. Please try again later.");
				}
			});
	};

	return (
		<div className="flex flex-col items-center gap-8 p-5 text-center md:p-10">
			<h1 className="text-2xl font-bold text-custom-main">✨ Support the project! ✨</h1>
			<div className="flex flex-col items-center gap-2 font-light text-gray-400">
				<p>Your contributions help keep the Dracania Archives alive!</p>
				<p>
					Every donation goes directly towards covering hosting and development costs, ensuring we can keep bringing you
					the best tools and data.
				</p>
				<p>
					<span className="font-bold text-gray-300">No amount is too small, </span>
					and every bit helps us continue to grow and improve! 🙌
				</p>
			</div>
			<Button className="text-lg font-semibold" size="lg" variant="secondary" onClick={handleDonate}>
				Donate now 💖
			</Button>
		</div>
	);
}
