import { GemTypes } from "@/types/consts";
import type { GemType } from "@/types/gems";
import type { StatType } from "@/types/items";

type GemRarityLength = 17;
type GemUpgradeCostsLength = 16;

const gemValues: {
	type: GemType;
	stat: StatType;
	values: number[] & { length: GemRarityLength };
}[] = [
	{
		type: "Ruby",
		stat: "Damage",
		values: [2, 3, 6, 10, 15, 24, 36, 54, 80, 113, 145, 200, 300, 400, 500, 600, 700],
	},
	{
		type: "Onyx",
		stat: "Critical Value",
		values: [15, 30, 60, 100, 150, 225, 345, 480, 600, 750, 900, 1170, 1440, 1710, 1980, 2250, 2520],
	},
	{
		type: "Emerald",
		stat: "Block Value",
		values: [15, 30, 60, 100, 150, 225, 345, 480, 600, 750, 900, 1170, 1440, 1710, 1980, 2250, 2520],
	},
	{
		type: "Zircon",
		stat: "Attacks per Second",
		values: [
			0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008, 0.009, 0.01, 0.011, 0.012, 0.013, 0.014, 0.015, 0.016,
			0.017,
		],
	},
	{
		type: "Rhodolite",
		stat: "Movement Speed",
		values: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17],
	},
	{
		type: "Amethyst",
		stat: "Health Points",
		values: [10, 20, 45, 105, 170, 305, 480, 700, 1000, 1280, 1900, 2500, 3100, 3700, 4300, 4900, 5500],
	},
	{
		type: "Cyanite",
		stat: "Armor Value",
		values: [6, 12, 24, 40, 60, 90, 135, 200, 250, 330, 390, 510, 630, 750, 870, 990, 1110],
	},
	{
		type: "Diamond",
		stat: "All Resistance",
		values: [6, 12, 24, 40, 60, 90, 135, 200, 250, 330, 390, 510, 630, 750, 870, 990, 1110],
	},
	{
		type: "Diamond (Fire)",
		stat: "Fire Resistance",
		values: [24, 48, 96, 160, 240, 360, 540, 800, 1000, 1320, 1560, 2040, 2520, 3000, 3480, 3960, 4440],
	},
	{
		type: "Diamond (Ice)",
		stat: "Ice Resistance",
		values: [24, 48, 96, 160, 240, 360, 540, 800, 1000, 1320, 1560, 2040, 2520, 3000, 3480, 3960, 4440],
	},
	{
		type: "Diamond (Lightning)",
		stat: "Lightning Resistance",
		values: [24, 48, 96, 160, 240, 360, 540, 800, 1000, 1320, 1560, 2040, 2520, 3000, 3480, 3960, 4440],
	},
	{
		type: "Diamond (Poison)",
		stat: "Poison Resistance",
		values: [24, 48, 96, 160, 240, 360, 540, 800, 1000, 1320, 1560, 2040, 2520, 3000, 3480, 3960, 4440],
	},
	{
		type: "Diamond (Andermagic)",
		stat: "Andermagic Resistance",
		values: [24, 48, 96, 160, 240, 360, 540, 800, 1000, 1320, 1560, 2040, 2520, 3000, 3480, 3960, 4440],
	},
];

const gemUpgradeCosts: {
	type: [keyof typeof GemTypes][number];
	costs: number[] & { length: GemUpgradeCostsLength };
}[] = [
	{
		type: "offensive",
		costs: [2, 6, 10, 20, 50, 150, 450, 1000, 2000, 3500, 5500, 8000, 11000, 14500, 18500, 23000],
	},
	{
		type: "defensive",
		costs: [2, 4, 8, 16, 40, 120, 360, 800, 1600, 2800, 4400, 6400, 8800, 11600, 14800, 18400],
	},
];

export { gemUpgradeCosts, gemValues };
