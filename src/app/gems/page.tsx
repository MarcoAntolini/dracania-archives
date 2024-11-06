"use client";

import RenderGem from "@/components/game/gem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GemRarities, GemTypes } from "@/types/consts";
import type { GemType } from "@/types/gems";
import { useMeasure } from "@uidotdev/usehooks";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GemsPage() {
	const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean[]>>({});

	const [selectedGemType, setSelectedGemType] = useState<GemType | null>(null);

	useEffect(() => {
		const newTooltipState = Object.keys(GemTypes).reduce(
			(acc, type) => {
				acc[type] = Array(GemRarities.length).fill(false);
				return acc;
			},
			{} as Record<string, boolean[]>,
		);
		setTooltipOpen(newTooltipState);
	}, []);

	const toggleTooltip = (gemName: string, rarityIndex: number, open?: boolean) => {
		setTooltipOpen((prev) => {
			const newTooltipState = { ...prev };
			Object.keys(newTooltipState).forEach((key) => {
				newTooltipState[key] = Array(newTooltipState[key].length).fill(false);
			});
			if (!newTooltipState[gemName]) {
				newTooltipState[gemName] = Array(GemRarities.length).fill(false);
			}
			newTooltipState[gemName][rarityIndex] = open ?? !prev[gemName]?.[rarityIndex];
			return newTooltipState;
		});
	};

	const [ref, { width }] = useMeasure();

	return (
		<div className="flex max-w-full flex-col gap-8 px-6 py-10 md:px-10">
			<div className="flex flex-col gap-8">
				<h1 className="px-3 text-2xl text-custom-main">Gems</h1>
				<div className="flex gap-4" style={{ width: `${width}px` }}>
					<Select value={selectedGemType ?? ""} onValueChange={(value) => setSelectedGemType(value as GemType)}>
						<SelectTrigger className={`${!selectedGemType ? "text-muted-foreground" : ""}`}>
							<SelectValue placeholder="Select a gem type" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(GemTypes).flatMap(([_, gems]) =>
								gems.map((gemType) => (
									<SelectItem key={"s_" + gemType.toLowerCase().replace(" ", "_")} value={gemType}>
										{gemType}
									</SelectItem>
								)),
							)}
						</SelectContent>
					</Select>
					<Button variant="secondary" onClick={() => setSelectedGemType(null)}>
						Reset
					</Button>
				</div>
			</div>
			<div className="flex max-w-fit flex-wrap gap-4">
				{Object.entries(GemTypes)
					.flatMap(([role, gems]) =>
						(!selectedGemType ? gems : gems.filter((gemType) => gemType === selectedGemType)).map((gemType) => ({
							gemType,
							role,
						})),
					)
					.map(({ gemType, role }) => (
						<Card key={gemType.replace(" ", "_")} ref={ref}>
							<CardHeader>
								<CardTitle className="text-xl">{gemType}</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-wrap gap-4">
								{GemRarities.map((gemRarity) => (
									<TooltipProvider>
										<Tooltip
											delayDuration={0}
											open={tooltipOpen[gemType + gemRarity]?.[0]}
											onOpenChange={(open) => toggleTooltip(gemType + gemRarity, 0, open)}
											disableHoverableContent
										>
											<TooltipTrigger
												key={
													(gemType.includes(" ") ? gemType.split(" ")[1].replace(/[() ]/g, "").slice(0, 3) : gemType) +
													(gemRarity === ""
														? gemRarity + "_"
														: gemRarity.includes(" ")
															? gemRarity
																	.split(" ")
																	.map((word) => word.slice(0, 3))
																	.join("")
															: gemRarity.slice(0, 5))
												}
											>
												<div className="relative h-[100px] w-[100px]">
													<Image
														src="/images/ui/bg_rarity_common.png"
														alt="bg"
														width={100}
														height={100}
														className="absolute"
													/>
													<Image
														src={`/images/db/gems/gem_${gemType.toLowerCase().replace(" ", "_").replace(/[ ()]/g, "")}_${gemRarity.toLowerCase().replace(" ", "_")}.png`}
														alt={gemType + " " + gemRarity}
														width={100}
														height={100}
														className="absolute"
													/>
													<Image
														src="/images/ui/item_frame.png"
														alt="frame"
														width={100}
														height={100}
														className="absolute"
													/>
												</div>
											</TooltipTrigger>
											<TooltipContent className="bg-[#050705f1] p-0">
												<RenderGem
													gem={{ type: gemType, rarity: gemRarity, role: role as "offensive" | "defensive" | "opal" }}
												/>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								))}
							</CardContent>
						</Card>
					))}
			</div>
		</div>
	);
}
