import type { Prettify } from "ts-hover-prettify";
import { Classes, Rarities, Slots, StatTypes } from "./consts";
import type { Percentage, String } from "./utilities";
import type { AllImage } from "./images";

type Class = (typeof Classes)[keyof typeof Classes];

type Rarity = (typeof Rarities)[keyof typeof Rarities];

type Slot = (typeof Slots)[keyof typeof Slots];

type StatType = (typeof StatTypes)[keyof typeof StatTypes];

type BaseStat = {
	stat: StatType;
	minValue: number;
	maxValue: number;
};

type AdvancedStat = {
	stat: StatType;
	value: number | Percentage;
};

type Bonus = AdvancedStat | String;

type BaseItem = {
	class: Class;
	image: AllImage;
	name: string;
	rarity: Rarity;
	slot: Slot;
	level: number;
	stats: BaseStat[];
};

type ItemSet = {
	name: string;
	items: string[];
	setBonus: {
		requiredItems: number;
		bonus: Bonus;
	}[];
};

type SetItem = Prettify<
	BaseItem & {
		rarity: "Set Item";
		set: ItemSet;
	}
>;

type UniqueItem = Prettify<
	BaseItem & {
		rarity: "Unique Item";
		uniqueBonus: {
			bonus: Bonus;
		}[];
	}
>;

type MythicItem = Prettify<
	BaseItem & {
		rarity: "Mythic Item";
		set?: ItemSet;
		uniqueBonus?: {
			bonus: Bonus;
		}[];
	}
>;

type Item = SetItem | UniqueItem | MythicItem;

export type {
	AdvancedStat,
	BaseItem,
	BaseStat,
	Bonus,
	Class,
	Item,
	ItemSet,
	MythicItem,
	Rarity,
	SetItem,
	Slot,
	StatType,
	UniqueItem,
};
