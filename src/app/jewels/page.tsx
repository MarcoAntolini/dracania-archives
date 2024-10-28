"use client";

import RenderJewel from "@/components/game/jewel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { jewels } from "@/data/db/jewels";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function JewelsPage() {
	const [search, setSearch] = useState("");

	const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean[]>>({});

	useEffect(() => {
		const newTooltipState = jewels.reduce(
			(acc, jewel) => {
				acc[jewel.name] =
					jewel.type === "mythic" ? [false] : jewel.type === "magic" ? Array(3).fill(false) : Array(5).fill(false);
				return acc;
			},
			{} as Record<string, boolean[]>,
		);
		setTooltipOpen(newTooltipState);
	}, []);

	const toggleTooltip = (jewelName: string, rarityIndex: number, open?: boolean) => {
		setTooltipOpen((prev) => {
			const newTooltipState = { ...prev };
			Object.keys(newTooltipState).forEach((key) => {
				newTooltipState[key] = Array(newTooltipState[key].length).fill(false);
			});
			return newTooltipState;
		});
		setTooltipOpen((prev) => {
			prev[jewelName][rarityIndex] = open ?? !prev[jewelName]?.[rarityIndex];
			return prev;
		});
	};

	return (
		<div className="max-w-full px-6 py-10 md:px-10">
			<div className="mb-6 flex flex-col gap-8">
				<h1 className="px-3 text-2xl text-custom-main">Jewels</h1>
				<Input
					type="text"
					placeholder="Search jewels by name or effect"
					className="w-full md:max-w-[350px]"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="flex flex-wrap gap-4">
				{jewels
					.filter((jewel) => {
						if (search === "") return true;
						return (
							jewel.name.toLowerCase().includes(search.toLowerCase()) ||
							jewel.effect.toString().toLowerCase().includes(search.toLowerCase()) ||
							(!jewel.isClassSpecific &&
								Object.values(jewel.effect as Record<string, string>).some((value) =>
									value.toLowerCase().includes(search.toLowerCase()),
								)) ||
							(jewel.isClassSpecific &&
								Object.values(jewel.effect as Record<string, object>).some((value) =>
									Object.values(value as Record<string, string>).some((v) =>
										v.toLowerCase().includes(search.toLowerCase()),
									),
								))
						);
					})
					.map((jewel) => (
						<Card key={jewel.name} className="w-[614px] min-w-[calc((614px-16px)/2)] max-w-[614px]">
							<CardHeader>
								<CardTitle className="text-xl">{jewel.name}</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-wrap gap-4">
								<TooltipProvider>
									{jewel.type === "mythic" ? (
										<Tooltip
											delayDuration={0}
											open={tooltipOpen[jewel.name]?.[0]}
											onOpenChange={(open) => toggleTooltip(jewel.name, 0, open)}
											disableHoverableContent
										>
											<TooltipTrigger>
												<div className="relative h-[100px] w-[100px]" onClick={() => toggleTooltip(jewel.name, 0)}>
													<Image
														src="/images/ui/bg_rarity_mythic.png"
														alt="bg"
														width={100}
														height={100}
														className="absolute"
													/>
													<Image src={jewel.image} alt={jewel.name} width={100} height={100} className="absolute" />
													<Image
														src="/images/ui/item_frame_mythic.png"
														alt="frame"
														width={100}
														height={100}
														className="absolute"
													/>
												</div>
											</TooltipTrigger>
											<TooltipContent className="bg-[#050705f1] p-0">
												<RenderJewel jewel={jewel} rarity="mythic" />
											</TooltipContent>
										</Tooltip>
									) : jewel.type === "magic" ? (
										Array.from(["magic", "extraordinary", "legendary"]).map((rarity, index) => (
											<Tooltip
												key={index}
												delayDuration={0}
												open={tooltipOpen[jewel.name]?.[index + 1]}
												onOpenChange={(open) => toggleTooltip(jewel.name, index + 1, open)}
												disableHoverableContent
											>
												<TooltipTrigger>
													<div
														className="relative h-[100px] w-[100px]"
														onClick={() => toggleTooltip(jewel.name, index + 1)}
													>
														<Image
															src={`/images/ui/bg_rarity_${rarity}.png`}
															alt="bg"
															width={100}
															height={100}
															className="absolute"
														/>
														<Image src={jewel.image} alt={jewel.name} width={100} height={100} className="absolute" />
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
													<RenderJewel jewel={jewel} rarity={rarity as "magic" | "extraordinary" | "legendary"} />
												</TooltipContent>
											</Tooltip>
										))
									) : (
										Array.from(["common", "improved", "magic", "extraordinary", "legendary"]).map((rarity, index) => (
											<Tooltip
												key={index}
												delayDuration={0}
												open={tooltipOpen[jewel.name]?.[index + 1]}
												onOpenChange={(open) => toggleTooltip(jewel.name, index + 1, open)}
												disableHoverableContent
											>
												<TooltipTrigger>
													<div
														className="relative h-[100px] w-[100px]"
														onClick={() => toggleTooltip(jewel.name, index + 1)}
													>
														<Image src={`/images/ui/bg_rarity_${rarity}.png`} alt="bg" fill />
														<Image src={jewel.image} alt={jewel.name} fill />
														<Image src="/images/ui/item_frame.png" alt="frame" fill />
													</div>
												</TooltipTrigger>
												<TooltipContent className="bg-[#050705f1] p-0">
													<RenderJewel
														jewel={jewel}
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
