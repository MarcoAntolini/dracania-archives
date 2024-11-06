import type { GemRarities, GemTypes } from "./consts";

export type GemRarity = (typeof GemRarities)[number];

export type GemType = (typeof GemTypes)[keyof typeof GemTypes][number];

export type Gem = {
	role: "offensive" | "defensive" | "opal";
	type: GemType;
	rarity: GemRarity;
};
