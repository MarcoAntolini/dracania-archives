"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import CustomSeparator from "./game/custom-separator";

export default function Body({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<SidebarInset>
			<div className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 bg-custom-background transition-[width,height] ease-linear">
				<div className="flex w-full flex-col">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem key={0} className="hidden md:block">
									<BreadcrumbLink href="/">Home</BreadcrumbLink>
								</BreadcrumbItem>
								{pathname.split("/").map((path, index) => {
									if (path !== "") {
										const href = pathname
											.split("/")
											.slice(0, index + 1)
											.join("/");
										return (
											<Fragment key={href}>
												{index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
												<BreadcrumbItem className="hidden md:block">
													<BreadcrumbLink href={href}>
														{path
															.replace(/-/g, " ")
															.replace(/%20/g, " ")
															.split(" ")
															.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
															.join(" ")}
													</BreadcrumbLink>
												</BreadcrumbItem>
											</Fragment>
										);
									}
									return null;
								})}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<CustomSeparator type="main" className="absolute bottom-0 w-full" />
				</div>
			</div>
			{children}
		</SidebarInset>
	);
}
