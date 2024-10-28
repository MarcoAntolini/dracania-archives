"use client";

import { NavSidebarContainer } from "@/components/nav-sidebar-container";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/data/sidebar";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { isMobile } from "react-device-detect";
import CustomSeparator from "./game/custom-separator";

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { toggleSidebar } = useSidebar();

	const toggleSidebarMobile = () => {
		if (isMobile) {
			toggleSidebar();
		}
	};

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
								<div className="size-8 flex aspect-square items-center justify-center rounded-lg text-sidebar-primary-foreground">
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
				<CustomSeparator type="main" className="mt-2" />
				{/* <SidebarFooter> */}
				<NavSidebarContainer title="Community" items={sidebarData.community} />
				{/* </SidebarFooter> */}
			</SidebarContent>
		</Sidebar>
	);
}
