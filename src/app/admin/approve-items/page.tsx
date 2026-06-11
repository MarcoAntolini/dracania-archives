"use client";

import EquipItem from "@/components/game/item";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { ContributionStatus } from "@/types/enums/contributions";
import type { DbItem, Item } from "@/types/items";
import { useMutation, useQuery } from "convex/react";
import { CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function ApproveItemsPage() {
	const nonApprovedItems = useQuery(api.queries.items.getNonApprovedItems);

	const [selectedItem, setSelectedItem] = useState<DbItem | undefined>(undefined);

	const updateItemContributionStatusMutation = useMutation(api.mutations.items.updateItemContributionStatus);
	const approveItem = async () => {
		if (!selectedItem) return;
		await updateItemContributionStatusMutation({
			itemId: selectedItem._id,
			contributionStatus: ContributionStatus.approved,
		}).then((result) => {
			if (result) {
				toast.success("Item approved");
				setSelectedItem(undefined);
			} else {
				toast.error("Failed to approve item");
			}
		});
	};
	const rejectItem = async () => {
		if (!selectedItem) return;
		await updateItemContributionStatusMutation({
			itemId: selectedItem._id,
			contributionStatus: ContributionStatus.rejected,
		}).then((result) => {
			if (result) {
				toast.success("Item rejected");
				setSelectedItem(undefined);
			} else {
				toast.error("Failed to reject item");
			}
		});
	};

	return (
		<div className="flex flex-col items-center justify-center px-6 py-10 md:px-10">
			<div className="flex flex-col items-center gap-8">
				<h2 className="text-2xl font-bold text-custom-main">Approve Items</h2>
				<div className="flex flex-col gap-4 md:flex-row md:gap-8">
					<div className="flex flex-col items-center gap-12">
						<Select
							onValueChange={(value) =>
								setSelectedItem(nonApprovedItems?.find((item) => item.name === value) as DbItem)
							}
							value={selectedItem?.name || ""}
						>
							<SelectTrigger
								className={cn(
									"w-full min-w-[400px] md:w-auto",
									selectedItem ? "text-foreground" : "text-muted-foreground",
								)}
							>
								<SelectValue placeholder="Select an item" />
							</SelectTrigger>
							<SelectContent>
								{nonApprovedItems?.length === 0 ? (
									<SelectItem value="undefined" disabled>
										No items to approve
									</SelectItem>
								) : (
									nonApprovedItems?.map((item) => (
										<SelectItem key={item._id} value={item.name}>
											{item.name} - ({item.class})
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
						{selectedItem && (
							<div className="hidden items-center gap-4 md:flex">
								<Button
									variant="default"
									className="bg-green-500 hover:bg-green-600"
									onClick={async () => await approveItem()}
								>
									<CheckIcon className="h-4 w-4" />
									Approve Item
								</Button>
								<Button variant="destructive" onClick={async () => await rejectItem()}>
									<XIcon className="h-4 w-4" />
									Reject Item
								</Button>
							</div>
						)}
					</div>
					{selectedItem && (
						<div className="flex flex-col items-center gap-4">
							<div className="flex items-center justify-center gap-4">
								<Image
									src={`/images/db/items/${selectedItem.image}.png`}
									alt={selectedItem.name}
									width={100}
									height={100}
								/>
								<Image
									src={`/images/classes/${selectedItem.class.toLowerCase().replace(" ", "-")}_logo.png`}
									alt={selectedItem.class}
									width={100}
									height={100}
								/>
							</div>
							<EquipItem item={selectedItem as Item} />
							<div className="flex items-center gap-4 md:hidden">
								<Button
									variant="default"
									className="bg-green-500 hover:bg-green-600"
									onClick={async () => await approveItem()}
								>
									<CheckIcon className="h-4 w-4" />
									Approve Item
								</Button>
								<Button variant="destructive" onClick={async () => await rejectItem()}>
									<XIcon className="h-4 w-4" />
									Reject Item
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
