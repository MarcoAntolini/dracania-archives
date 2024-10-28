import type { CommonJewel, CommonJewelEffect, MagicJewel, MythicJewel } from "@/data/db/jewels";
import Image from "next/image";

export default function RenderJewel({
	jewel,
	rarity,
}: {
	jewel: CommonJewel | MagicJewel | MythicJewel;
	rarity: "common" | "improved" | "magic" | "extraordinary" | "legendary" | "mythic";
}) {
	return (
		<div className="jewel flex h-fit w-[500px] max-w-[95vw] flex-col p-4">
			<h1 className={`jewel-name-${rarity} w-full pb-1 text-center italic`}>{jewel.name}</h1>
			<div>
				<p className={`jewel-name-${rarity}`}>Jewel</p>
				<p className="jewel-info italic">Usable in an item with slots</p>
			</div>
			<div className="py-1">
				<p className="jewel-sub-info">Effect:</p>
				<div className="jewel-effect">
					{!jewel.isClassSpecific
						? (rarity === "mythic" ? String(jewel.effect) : String((jewel.effect as CommonJewelEffect)[rarity]))
								.split("\n")
								.map((line, index) => (
									<p
										key={index}
										// className={line.startsWith("Cooldown") ? "text-[#ff5454]" : ""}
									>
										{line}
									</p>
								))
						: rarity === "mythic"
							? Object.entries(jewel.effect as Record<string, object>).map(([key, value]) => (
									<p key={key} className="relative">
										<Image
											src={`/images/classes/${key}_logo.png`}
											alt={key}
											width={22}
											height={22}
											className="absolute left-0 top-0"
										/>
										<span className="ml-6">: {Object.values(value as Record<string, string>)}</span>
									</p>
								))
							: Object.entries((jewel.effect as Record<string, object>)[rarity]).map(([key, value]) => (
									<p key={key} className="relative">
										<Image
											src={`/images/classes/${key}_logo.png`}
											alt={key}
											width={22}
											height={22}
											className="absolute left-0 top-0"
										/>
										<span className="ml-6">: {value}</span>
									</p>
								))}
				</div>
			</div>
			<div className="jewel-sub-info">
				<p>Can be socketed into: Jewel Trinket</p>
			</div>
			<p className="jewel-info">Socketable amount: {jewel.socketableAmount}</p>
		</div>
	);
}
