"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="e-404 flex flex-col items-center justify-center gap-8">
			<h2 className="text-6xl">404</h2>
			<h3 className="text-4xl">Not Found</h3>
			<p className="text-lg">Could not find the requested resource</p>
			<button onClick={() => router.back()} className="filter-input filter-button">
				Go Back
			</button>
		</div>
	);
}
