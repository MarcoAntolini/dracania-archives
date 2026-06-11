import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
	return (
		<div className="flex flex-col px-4 py-6 md:px-10 md:py-10">
			<div className="flex flex-col gap-6 md:gap-8">
				<h2 className="text-xl font-bold text-custom-main md:text-2xl">Admin Dashboard</h2>
				<div className="flex flex-col gap-4">
					<Separator />
					<div className="flex flex-col gap-4">
						<h3 className="text-lg font-bold">Manage Items:</h3>
						<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
							<Button className="w-full sm:w-auto" variant="outline" asChild>
								<Link href="/admin/approve-items">
									<BadgeCheck className="mr-2" />
									<span className="text-nowrap">Approve Items</span>
								</Link>
							</Button>
							<Button className="w-full sm:w-auto" variant="outline" asChild>
								<Link href="/admin/review-rejected-items">
									<Trash2 className="mr-2" />
									<span className="text-nowrap">Review Rejected Items</span>
								</Link>
							</Button>
						</div>
					</div>
					<Separator />
					<div className="flex flex-col gap-4">
						<h3 className="text-lg font-bold">Manage Sets:</h3>
						<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
							<Button className="w-full sm:w-auto" variant="outline" asChild>
								<Link href="/admin/approve-sets">
									<BadgeCheck className="mr-2" />
									<span className="text-nowrap">Approve Sets</span>
								</Link>
							</Button>
							<Button className="w-full sm:w-auto" variant="outline" asChild>
								<Link href="/admin/review-rejected-sets">
									<Trash2 className="mr-2" />
									<span className="text-nowrap">Review Rejected Sets</span>
								</Link>
							</Button>
							<Button className="w-full sm:w-auto" variant="outline" asChild>
								<Link href="/admin/edit-sets">
									<Edit className="mr-2" />
									<span className="text-nowrap">Edit Sets</span>
								</Link>
							</Button>
						</div>
					</div>
					<Separator />
				</div>
			</div>
		</div>
	);
}
