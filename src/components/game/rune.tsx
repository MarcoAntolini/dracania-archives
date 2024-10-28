import type { CommonRune, RuneEffect, UniqueRune } from "@/data/db/runes";

export default function RenderRune({
	rune,
	rarity,
}: {
	rune: CommonRune | UniqueRune;
	rarity: "common" | "improved" | "magic" | "extraordinary" | "legendary" | "unique";
}) {
	return (
		<div className="rune z-50 flex h-fit w-[500px] max-w-[95vw] flex-col p-4">
			<h1 className={`rune-name-${rarity} pb-1 text-center italic`}>{rune.name}</h1>
			<div>
				<p className={`rune-name-${rarity}`}>Rune</p>
				<p className="rune-info italic">Usable in an item with slots</p>
			</div>
			<div className="py-1">
				<p className="rune-sub-info">Effect:</p>
				<div className="rune-effect">
					{(rarity === "unique" ? String(rune.effect) : String((rune.effect as RuneEffect)[rarity]))
						.split("\n")
						.map((line, index) => (
							<p key={index} className={line.startsWith("Cooldown") ? "text-[#ff5454]" : ""}>
								{line}
							</p>
						))}
				</div>
			</div>
			<div className="rune-sub-info">
				<p>Can be socketed into: Rune Trinket</p>
			</div>
			<p className="rune-info">Socketable amount: {rune.socketableAmount}</p>
		</div>
	);
}
