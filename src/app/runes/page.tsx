"use client";

import RenderRune from "@/components/game/rune";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { runes } from "@/data/db/runes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RunesPage() {
	const [search, setSearch] = useState("");

	const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean[]>>({});

	useEffect(() => {
		const newTooltipState = runes.reduce(
			(acc, rune) => {
				acc[rune.name] = rune.type === "unique" ? [false] : Array(5).fill(false);
				return acc;
			},
			{} as Record<string, boolean[]>,
		);
		setTooltipOpen(newTooltipState);
	}, []);

	const toggleTooltip = (runeName: string, rarityIndex: number, open?: boolean) => {
		setTooltipOpen((prev) => {
			const newTooltipState = { ...prev };
			Object.keys(newTooltipState).forEach((key) => {
				newTooltipState[key] = Array(newTooltipState[key].length).fill(false);
			});
			return newTooltipState;
		});
		setTooltipOpen((prev) => {
			prev[runeName][rarityIndex] = open ?? !prev[runeName]?.[rarityIndex];
			return prev;
		});
	};

	return (
		<div className="max-w-full px-6 py-10 md:px-10">
			<div className="mb-6 flex flex-col gap-8">
				<h1 className="pl-3 text-2xl text-custom-main">Runes</h1>
				<Input
					type="text"
					placeholder="Search runes by name or effect"
					className="w-full md:max-w-[350px]"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-wrap gap-4">
				{runes
					.filter((rune) => {
						if (search === "") return true;
						return (
							rune.name.toLowerCase().includes(search.toLowerCase()) ||
							rune.effect.toString().toLowerCase().includes(search.toLowerCase()) ||
							Object.values(rune.effect as Record<string, string>).some((value) =>
								value.toLowerCase().includes(search.toLowerCase()),
							)
						);
					})
					.map((rune) => (
						<Card key={rune.name} className="min-w-[calc((614px-16px)/2)] max-w-[614px]">
							<CardHeader>
								<CardTitle className="text-xl">{rune.name}</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-wrap gap-4">
								<TooltipProvider>
									{rune.type === "unique" ? (
										<Tooltip
											delayDuration={0}
											open={tooltipOpen[rune.name]?.[0]}
											onOpenChange={(open) => toggleTooltip(rune.name, 0, open)}
											disableHoverableContent
										>
											<TooltipTrigger>
												<div className="relative h-[100px] w-[100px]" onClick={() => toggleTooltip(rune.name, 0)}>
													<Image
														src="/images/ui/bg_rarity_unique.png"
														alt="bg"
														width={100}
														height={100}
														className="absolute"
													/>
													<Image src={rune.image} alt={rune.name} width={100} height={100} className="absolute" />
													<Image
														src="/images/ui/item_frame_unique.png"
														alt="frame"
														width={100}
														height={100}
														className="absolute"
													/>
												</div>
											</TooltipTrigger>
											<TooltipContent className="bg-[#050705f1] p-0">
												<RenderRune rune={rune} rarity="unique" />
											</TooltipContent>
										</Tooltip>
									) : (
										Array.from(["common", "improved", "magic", "extraordinary", "legendary"]).map((rarity, index) => (
											<Tooltip
												key={index}
												delayDuration={0}
												open={tooltipOpen[rune.name]?.[index + 1]}
												onOpenChange={(open) => toggleTooltip(rune.name, index + 1, open)}
												disableHoverableContent
											>
												<TooltipTrigger>
													<div
														className="relative h-[100px] w-[100px]"
														onClick={() => toggleTooltip(rune.name, index + 1)}
													>
														<Image
															src={`/images/ui/bg_rarity_${rarity}.png`}
															alt="bg"
															width={100}
															height={100}
															className="absolute"
														/>
														<Image src={rune.image} alt={rune.name} width={100} height={100} className="absolute" />
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
													<RenderRune
														rune={rune}
														rarity={rarity as "common" | "improved" | "magic" | "extraordinary" | "legendary"}
													/>
												</TooltipContent>
											</Tooltip>
										))
									)}
								</TooltipProvider>
							</CardContent>
						</Card>
					))}
			</div>
		</div>
	);
}
