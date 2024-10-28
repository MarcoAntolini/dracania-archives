"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import type { IconType } from "react-icons/lib";

export function NavSidebarContainer({
	title,
	items,
	className,
}: {
	title: string;
	items: {
		title: string;
		url?: string;
		image?: string;
		icon?: IconType;
		isDisabled?: boolean;
		isCollapsible?: boolean;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
			image?: string;
		}[];
	}[];
	className?: string;
}) {
	const { toggleSidebar } = useSidebar();

	const toggleSidebarMobile = () => {
		if (isMobile) {
			toggleSidebar();
		}
	};

	const [isOpen, setIsOpen] = useState<boolean[]>(
		items.map((item) => (item.isCollapsible ? item.isActive ?? false : false)),
	);

	return (
		<SidebarGroup className={className}>
			<SidebarGroupLabel>{title}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item, index) => (
					<Collapsible key={item.title} asChild defaultOpen={item.isActive}>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild className="w-full">
								<SidebarMenuButton
									asChild
									tooltip={item.title}
									onClick={() => {
										if (item.isCollapsible) {
											setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));
										}
										toggleSidebarMobile();
									}}
									disabled={item.isDisabled}
								>
									<Link
										href={item.isCollapsible ? "#" : item.url ?? "#"}
										className={item.isDisabled ? "pointer-events-none" : ""}
										target={item.url?.includes("http") ? "_blank" : "_self"}
									>
										{item.image && <Image src={item.image} alt={item.title} width={25} height={25} />}
										{item.icon && <item.icon />}
										<span className={item.isDisabled ? "text-muted-foreground" : ""}>{item.title}</span>
										{item.isCollapsible && (
											<SidebarMenuAction
												className={`${isOpen[index] ? "rotate-90" : ""} transition-transform duration-200`}
											>
												<ChevronRight />
												<span className="sr-only">Toggle</span>
											</SidebarMenuAction>
										)}
									</Link>
								</SidebarMenuButton>
							</CollapsibleTrigger>
							{item.items?.length ? (
								<>
									<CollapsibleContent
										className={cn(
											"text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
										)}
									>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild onClick={() => toggleSidebarMobile()}>
														<Link href={subItem.url}>
															{subItem.image && (
																<Image src={subItem.image} alt={subItem.title} width={25} height={25} />
															)}
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</>
							) : null}
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
