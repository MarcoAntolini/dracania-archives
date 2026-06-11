"use client";

import ItemForm from "@/app/add-items/[className]/itemForm";
import EquipItem from "@/components/game/item";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ContributionStatus } from "@/types/enums/contributions";
import type { Class, DbItem, Item } from "@/types/items";
import { useMutation, useQuery } from "convex/react";
import { Edit, Trash2 } from "lucide-react";
import { StaticImage as Image } from "@/components/ui/static-image";
import { useState } from "react";
import { toast } from "sonner";

export default function ReviewRejectedItemsPage() {
	const rejectedItems = useQuery(api.queries.items.getRejectedItems);

	const [selectedItem, setSelectedItem] = useState<DbItem | undefined>(undefined);

	const deleteItem = useMutation(api.mutations.items.deleteItem);
	const handleDeleteItem = async () => {
		await deleteItem({ ...selectedItem } as DbItem);
		setSelectedItem(undefined);
		toast.success("Item deleted");
	};

	const [isEditing, setIsEditing] = useState(false);

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

	return (
		<div className="flex flex-col items-center justify-center px-6 py-10 md:px-10">
			<div className="flex flex-col items-center gap-8">
				<h2 className="text-2xl font-bold text-custom-main">Review Rejected Items</h2>
				<div className="flex flex-col gap-4 md:flex-row md:gap-8">
					<div className="flex flex-col items-center gap-12">
						<Select
							onValueChange={(value) => {
								setSelectedItem(rejectedItems?.find((item) => item.name === value) as DbItem);
								setIsEditing(false);
							}}
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
								{rejectedItems?.length === 0 ? (
									<SelectItem value="undefined" disabled>
										No items to review
									</SelectItem>
								) : (
									rejectedItems?.map((item) => (
										<SelectItem key={item._id} value={item.name}>
											{item.name}
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
						{selectedItem && (
							<div className="hidden items-center gap-4 md:flex">
								<Button variant="destructive" onClick={async () => await deleteItem({ ...selectedItem })}>
									<Trash2 className="mr-2 h-4 w-4" />
									Delete Item
								</Button>
								<Button variant="outline" onClick={() => setIsEditing(true)}>
									<Edit className="mr-2 h-4 w-4" />
									Edit Item
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
								{/* <Button variant="outline" onClick={async () => await approveItem()}>
									<CheckIcon className="mr-2 h-4 w-4" />
									Approve Item
								</Button> */}
								<Button variant="destructive" onClick={async () => await handleDeleteItem()}>
									<Trash2 className="mr-2 h-4 w-4" />
									Delete Item
								</Button>
								<Button variant="outline" onClick={() => setIsEditing(true)}>
									<Edit className="mr-2 h-4 w-4" />
									Edit Item
								</Button>
							</div>
						</div>
					)}
				</div>
				{isEditing && selectedItem && (
					<ItemForm
						classValue={selectedItem.class}
						setItem={(item) => setSelectedItem(item as DbItem)}
						clearItemForm={() => setSelectedItem(undefined)}
						defaultValues={selectedItem as Item & { _id: Id<"items">; class: Class }}
						formType="edit"
						editSubmit={approveItem}
					/>
				)}
			</div>
		</div>
	);
}
