"use client";

import EquipItem from "@/components/game/item";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import type { Item } from "@/types/items";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ItemWithId = Item & { _id: Id<"items"> };

const loginFormSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export default function TesterPage() {
	const cookies = useCookies();

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const [authenticated, setAuthenticated] = useState(false);

	const authenticateUserWithToken = useMutation(api.mutations.users.authenticateUserWithToken);
	useEffect(() => {
		const token = cookies.get("token") || "";
		async function checkToken() {
			authenticateUserWithToken({ token }).then((result) => {
				if (result?.success) {
					setAuthenticated(true);
				} else {
					setAuthenticated(false);
				}
			});
		}
		checkToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const authenticateUserWithCredentials = useMutation(api.mutations.users.authenticateUserWithCredentials);
	const createToken = useMutation(api.mutations.users.createToken);

	const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
		const result = await authenticateUserWithCredentials(data);
		if (result?.success) {
			const token = await createToken({ userId: result.userId as Id<"users"> });
			cookies.set("token", token || "", {
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
				path: "/tester",
				secure: true,
			});
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
			{authenticated ? (
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
								<Image
									src={`/images/db/items/${selectedItem.image}.png`}
									alt={selectedItem.name}
									width={100}
									height={100}
								/>
								<EquipItem item={selectedItem} />
								<Button onClick={async () => await approveItem()}>Approve Item</Button>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center gap-4">
					<h2 className="text-2xl font-bold text-custom-main">Access Restricted</h2>
					<p className="text-sm text-gray-500">Please enter your username and password to continue.</p>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<Input type="text" {...field} placeholder="Username" className="w-full min-w-[400px]" />
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<Input type="password" {...field} placeholder="Password" className="w-full min-w-[400px]" />
								)}
							/>
							<Button type="submit">Authenticate</Button>
						</form>
					</Form>
				</div>
			)}
		</div>
	);
}
