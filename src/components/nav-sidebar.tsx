"use client";

import { NavSidebarContainer } from "@/components/nav-sidebar-container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { sidebarData } from "@/data/sidebar";
import { hasPermission } from "@/types/permissions";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { BadgeCheck, ChevronsUpDown, Edit, Loader2, LogIn, LogOut, Plus, Settings, Trash2 } from "lucide-react";
import { StaticImage as Image } from "@/components/ui/static-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import CustomSeparator from "./game/custom-separator";

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { toggleSidebar } = useSidebar();
	const toggleSidebarMobile = () => {
		if (isMobile) {
			toggleSidebar();
		}
	};

	const router = useRouter();

	const { signOut } = useAuthActions();

	const currentUser = useQuery(api.queries.users.getCurrentUser);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (currentUser) {
			setIsLoading(false);
		}
	}, [currentUser]);

	return (
		<Sidebar variant="inset" {...props} className="p-0">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							asChild
							onClick={() => {
								toggleSidebarMobile();
							}}
						>
							<Link href="/">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
									<Image
										src="/images/website-logo.png"
										alt="Dracania Archives"
										width={32}
										height={32}
										className="h-auto w-auto"
									/>
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Dracania Archives</span>
									<span className="truncate text-xs">DSO Community Project</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<CustomSeparator type="main" />
			<SidebarContent>
				<NavSidebarContainer title="News" items={sidebarData.news} />
				<NavSidebarContainer title="Database" items={sidebarData.database} />
				<NavSidebarContainer title="Tools" items={sidebarData.tools} />
				<NavSidebarContainer title="Contribute" items={sidebarData.contribute} />
				<NavSidebarContainer title="Project" items={sidebarData.project} className="mt-auto" />
				<NavSidebarContainer title="Community" items={sidebarData.community} />
			</SidebarContent>
			<SidebarFooter>
				<CustomSeparator type="main" className="mt-2" />
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="flex items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									{isLoading ? (
										<Loader2 className="h-10 w-10 animate-spin" />
									) : (
										<>
											<Avatar className="h-8 w-8 rounded-lg">
												{currentUser?.exists ? (
													currentUser?.image ? (
														<AvatarImage
															src={`/images/npcs/${currentUser.image}.png`}
															alt="user-image"
															className="rounded-full border border-custom-main"
														/>
													) : (
														<AvatarImage
															src={`/images/icons/${currentUser?.role}.png`}
															alt="user-image"
															width={32}
															height={32}
														/>
													)
												) : (
													<AvatarImage src="/images/icons/user.png" alt="user-image" className="opacity-50" />
												)}
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">
													{currentUser?.role
														? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
														: "Guest"}
												</span>
												<span className="truncate text-xs">{currentUser?.username || ""}</span>
											</div>
											<ChevronsUpDown className="ml-auto size-4" />
										</>
									)}
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								side="bottom"
								align="end"
								sideOffset={4}
							>
								<Authenticated>
									<DropdownMenuLabel className="p-0 font-normal">
										<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
											<Avatar className="h-8 w-8 rounded-lg">
												{currentUser?.image ? (
													<AvatarImage
														src={`/images/npcs/${currentUser?.image}.png`}
														alt="user-image"
														className="rounded-full border border-custom-main"
													/>
												) : (
													<AvatarImage
														src={`/images/icons/${currentUser?.role}.png`}
														alt="user-image"
														width={32}
														height={32}
													/>
												)}
											</Avatar>
											<div className="grid flex-1 text-left text-sm leading-tight">
												<span className="truncate font-semibold">
													{currentUser?.role && currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
												</span>
												<span className="truncate text-xs">{currentUser?.username}</span>
											</div>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem asChild className="cursor-pointer">
											<Link href="/user-settings">
												<Settings />
												User Settings
											</Link>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									{currentUser?.role && (
										<>
											<DropdownMenuSeparator />
											<DropdownMenuGroup>
												{hasPermission(currentUser.role, "items:approve") &&
													hasPermission(currentUser.role, "items:review") && (
														<DropdownMenuSub>
															<DropdownMenuSubTrigger>
																<Image
																	src="/images/icons/dashboard-items.png"
																	alt="items"
																	width={16}
																	height={16}
																	className="mr-2"
																/>
																Items Dashboard
															</DropdownMenuSubTrigger>
															<DropdownMenuSubContent>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/approve-items">
																		<BadgeCheck />
																		Approve Items
																	</Link>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/review-rejected-items">
																		<Trash2 />
																		Review Rejected Items
																	</Link>
																</DropdownMenuItem>
															</DropdownMenuSubContent>
														</DropdownMenuSub>
													)}
												{hasPermission(currentUser.role, "sets:approve") &&
													hasPermission(currentUser.role, "sets:review") &&
													hasPermission(currentUser.role, "sets:edit") && (
														<DropdownMenuSub>
															<DropdownMenuSubTrigger>
																<Image
																	src="/images/icons/dashboard-sets.png"
																	alt="sets"
																	width={16}
																	height={16}
																	className="mr-2"
																/>
																Sets Dashboard
															</DropdownMenuSubTrigger>
															<DropdownMenuSubContent>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/approve-sets">
																		<BadgeCheck />
																		Approve Sets
																	</Link>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/review-rejected-sets">
																		<Trash2 />
																		Review Rejected Sets
																	</Link>
																</DropdownMenuItem>
																{/* <DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/edit-sets">
																		<Edit />
																		Edit Sets
																	</Link>
																</DropdownMenuItem> */}
															</DropdownMenuSubContent>
														</DropdownMenuSub>
													)}
												{hasPermission(currentUser.role, "bonus-codes:create") &&
													hasPermission(currentUser.role, "bonus-codes:edit") &&
													hasPermission(currentUser.role, "bonus-codes:delete") && (
														<DropdownMenuSub>
															<DropdownMenuSubTrigger disabled className="text-muted-foreground">
																<Image
																	// src="/images/icons/dashboard-codes.png"
																	src="/images/icons/locked.png"
																	alt="bonus-codes"
																	width={16}
																	height={16}
																	className="mr-2"
																/>
																Bonus Codes Dashboard
															</DropdownMenuSubTrigger>
															<DropdownMenuSubContent>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/add-bonus-code">
																		<Plus />
																		Add Bonus Code
																	</Link>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/edit-bonus-codes">
																		<Edit />
																		Edit Bonus Codes
																	</Link>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/delete-bonus-codes">
																		<Trash2 />
																		Delete Bonus Codes
																	</Link>
																</DropdownMenuItem>
															</DropdownMenuSubContent>
														</DropdownMenuSub>
													)}
												{hasPermission(currentUser.role, "events:create") &&
													hasPermission(currentUser.role, "events:edit") &&
													hasPermission(currentUser.role, "events:delete") && (
														<DropdownMenuSub>
															<DropdownMenuSubTrigger disabled className="text-muted-foreground">
																<Image
																	// src="/images/icons/dashboard-events.png"
																	src="/images/icons/locked.png"
																	alt="events"
																	width={16}
																	height={16}
																	className="mr-2"
																/>
																Events Dashboard
															</DropdownMenuSubTrigger>
															<DropdownMenuSubContent>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/add-event">
																		<Plus />
																		Add Event
																	</Link>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/edit-events">
																		<Edit />
																		Edit Events
																	</Link>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer" asChild>
																	<Link href="/admin/delete-events">
																		<Trash2 />
																		Delete Events
																	</Link>
																</DropdownMenuItem>
															</DropdownMenuSubContent>
														</DropdownMenuSub>
													)}
											</DropdownMenuGroup>
										</>
									)}
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => signOut().then(() => router.push("/login"))}
										className="cursor-pointer"
									>
										<LogOut />
										Log out
									</DropdownMenuItem>
								</Authenticated>
								<Unauthenticated>
									<DropdownMenuItem className="cursor-pointer" asChild>
										<Link href="/login">
											<LogIn />
											Login
										</Link>
									</DropdownMenuItem>
								</Unauthenticated>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
