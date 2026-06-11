"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { api } from "@/convex/_generated/api";
import { NPCsFileNames } from "@/types/images/npcs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction, useQuery } from "convex/react";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	username: z.string(),
	image: z.string(),
	oldPassword: z.string().optional(),
	newPassword: z.string().optional(),
	confirmPassword: z.string().optional(),
});

export default function UserSettingsPage() {
	const images = NPCsFileNames;
	const [open, setOpen] = useState(false);

	const currentUser = useQuery(api.queries.users.getCurrentUser);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (currentUser) {
			setIsLoading(false);
		}
	}, [currentUser]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			image: currentUser?.image || "",
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const validatePassword = useAction(api.authAction.validatePassword);
	const updateUser = useAction(api.actions.users.updateUser);

	const handleSave = form.handleSubmit((values) => {
		const username = values.username || currentUser?.username;
		const image = values.image === "default" ? "" : values.image || currentUser?.image;
		if (values.oldPassword && values.newPassword) {
			if (values.oldPassword === values.newPassword) {
				toast.error("New password cannot be the same as the current password");
				return;
			}
			if (values.confirmPassword !== values.newPassword) {
				toast.error("Passwords do not match");
				return;
			}
			const validateAndUpdate = async () => {
				const result = await validatePassword({
					password: values.oldPassword || "",
					username: username || "",
				});
				if (result.success) {
					updateUser({
						username: username || "",
						image: image || "",
						newPassword: values.newPassword,
					});
				}
			};
			validateAndUpdate();
		} else {
			updateUser({
				username: username || "",
				image: image || "",
			});
		}
		form.reset({
			username: "",
			image: image || "",
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
		toast.success("User updated successfully");
	});

	const handleResetImage = (e: MouseEvent) => {
		e.preventDefault();
		form.setValue("image", "default");
	};

	return (
		<div className="flex flex-col items-center gap-4 px-4 py-10 md:px-10">
			{/* <h1 className="mb-4 w-full text-2xl font-bold text-custom-main">User Settings</h1> */}
			{isLoading ? (
				<Loader2 className="mt-20 h-16 w-16 animate-spin text-custom-main" />
			) : (
				<Card className="w-full">
					<CardHeader>
						<CardTitle className="text-custom-main">Account Information</CardTitle>
						<CardDescription>Update your account information</CardDescription>
					</CardHeader>
					<Separator />
					<CardContent className="flex flex-col gap-4 pt-4">
						<Form {...form}>
							<form className="space-y-4">
								<FormField
									control={form.control}
									name="image"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Profile Picture</FormLabel>
											<FormControl>
												<div className="flex items-center gap-4">
													{(field.value || currentUser?.image) && field.value !== "default" ? (
														<Image
															src={`/images/npcs/${field.value || currentUser?.image}.png`}
															alt="Selected profile"
															width={50}
															height={50}
															className="rounded-full border border-custom-main"
														/>
													) : (
														<Image
															src={`/images/icons/${currentUser?.role || "user"}.png`}
															alt="Selected profile"
															width={50}
															height={50}
														/>
													)}
													<Sheet open={open} onOpenChange={setOpen}>
														<SheetTrigger asChild>
															<Button variant="outline">Select</Button>
														</SheetTrigger>
														<SheetContent side="bottom" className="flex h-[80vh] flex-col">
															<SheetHeader>
																<SheetTitle>Choose Profile Image</SheetTitle>
															</SheetHeader>
															<div className="flex-1 overflow-y-auto">
																<div className="mx-auto flex flex-wrap gap-4 p-4">
																	{images.map((image, index) => (
																		<div
																			key={index}
																			onClick={() => {
																				form.setValue("image", image);
																				setOpen(false);
																			}}
																			className="cursor-pointer transition-opacity hover:opacity-75"
																		>
																			<Image
																				src={`/images/npcs/${image}.png`}
																				alt={`Profile option ${index + 1}`}
																				width={75}
																				height={75}
																				className={`rounded-full border ${
																					field.value === image || (!field.value && currentUser?.image === image)
																						? "border-2 border-primary"
																						: "border-custom-main"
																				}`}
																			/>
																		</div>
																	))}
																</div>
															</div>
														</SheetContent>
													</Sheet>
													{(field.value || currentUser?.image) && (
														<Button variant="destructive" onClick={handleResetImage} type="button">
															<Trash2 />
														</Button>
													)}
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input {...field} placeholder={currentUser?.username} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex flex-col gap-2">
									<FormField
										control={form.control}
										name="oldPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Current Password</FormLabel>
												<FormControl>
													<PasswordInput {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="newPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<PasswordInput {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirm Password</FormLabel>
												<FormControl>
													<PasswordInput {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex items-center gap-4 pt-2">
									<Button onClick={handleSave}>Save</Button>
									<Button
										variant="outline"
										onClick={(e) => {
											e.preventDefault();
											form.reset({
												username: "",
												image: currentUser?.image || "",
												oldPassword: "",
												newPassword: "",
												confirmPassword: "",
											});
										}}
									>
										Restore
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
