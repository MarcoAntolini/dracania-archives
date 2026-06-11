import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center">
			<h1 className="mb-4 text-4xl font-bold">Unauthorized Access</h1>
			<p className="mb-6 text-gray-600">You don&apos;t have permission to access this page.</p>
			<Button asChild variant="ghost">
				<Link href="/">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Return to Home
				</Link>
			</Button>
		</div>
	);
}
