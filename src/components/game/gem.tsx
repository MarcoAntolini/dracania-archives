import { gemValues } from "@/data/calculators/gems";
import { GemRarities } from "@/types/consts";
import type { Gem } from "@/types/gems";

export default function RenderGem({ gem }: { gem: Gem }) {
	const gemEffect = gemValues.find((g) => g.type === gem.type);
	const gemEffectStat = gemEffect?.stat;
	const gemEffectValue = gemEffect?.values[GemRarities.indexOf(gem.rarity)];

	const gemEffectStatCommon = () => {
		switch (gemEffectStat) {
			case "All Resistance":
				return "all resistance values";
			case "Attacks per Second":
				return "weapon attack speed";
			default:
				return gemEffectStat;
		}
	};

	return (
		<div className="gem flex h-fit w-[500px] max-w-[95vw] flex-col p-4">
			<h1 className="gem-name w-full pb-1 text-center italic">
				{gem.rarity} {gem.type}
			</h1>
			<div>
				<p className="gem-name">Gem</p>
				<p className="gem-info italic">Usable in an item with slots</p>
			</div>
			<div className="py-1">
				<p className="gem-sub-info">Effect:</p>
				<div className="gem-effect">
					{gem.role !== "opal"
						? String(gemEffectValue)
								.split("\n")
								.map((line, index) => (
									<p key={index}>
										+ {line} {gemEffectStatCommon()!.toLowerCase()} on this item
									</p>
								))
						: "Opal"}
				</div>
			</div>
			<div className="gem-sub-info">
				<p>Can be socketed into: All equipment items</p>
			</div>
			<p className="gem-info">
				Socketable amount:{" "}
				{gem.role === "opal" ? 10 : ["Onyx", "Zircon", "Rhodolite", "Emerald"].includes(gem.type) ? 30 : 50}
			</p>
		</div>
	);
}
