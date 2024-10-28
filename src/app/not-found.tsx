"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center gap-8 p-5 md:p-10">
			<h2 className="text-6xl">404</h2>
			<h3 className="text-4xl">Not Found</h3>
			<p className="text-lg">Could not find the requested resource</p>
			<Button variant="outline" onClick={() => router.back()}>
				Go Back
			</Button>
		</div>
	);
}
