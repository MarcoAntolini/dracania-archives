"use client";

import EquipItem from "@/components/game/item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import type { Item } from "@/types/items";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

type ItemWithId = Item & { _id: Id<"items"> };

export default function TesterPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [authenticated, setAuthenticated] = useState(false);

	const authenticateUser = useQuery(api.queries.users.authenticateUser, {
		username,
		password,
	});

	const checkAuthentication = () => {
		if (authenticateUser) {
			setAuthenticated(true);
		} else {
			toast.error("Invalid username or password");
			setAuthenticated(false);
		}
	};

	const nonApprovedItems = useQuery(api.queries.items.getNonApprovedItems);

	const [selectedItem, setSelectedItem] = useState<ItemWithId | undefined>(undefined);

	const approveItemMutation = useMutation(api.mutations.items.approveItem);

	const approveItem = async () => {
		if (!selectedItem) return;
		await approveItemMutation({ itemId: selectedItem._id }).then((result) => {
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
			{!authenticated ? (
				<div className="flex flex-col items-center gap-8">
					<h2 className="text-2xl font-bold text-custom-main">Approve Items</h2>
					<div className="flex flex-col gap-4 md:flex-row">
						<Select
							onValueChange={(value) =>
								setSelectedItem(nonApprovedItems?.find((item) => item.name === value) as ItemWithId)
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
								{nonApprovedItems?.map((item) => (
									<SelectItem key={item._id} value={item.name}>
										{item.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{selectedItem && (
							<div className="flex flex-col items-center gap-4">
								<EquipItem item={selectedItem} />
								<Button onClick={async () => await approveItem()}>Approve Item</Button>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center gap-4">
					<h2 className="text-2xl font-bold">Access Restricted</h2>
					<p className="text-sm text-gray-500">Please enter your username and password to continue.</p>
					<Input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
					<Input
						type="password"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={checkAuthentication}>Authenticate</Button>
				</div>
			)}
		</div>
	);
}
