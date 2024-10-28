import type { Prettify } from "ts-hover-prettify";
import { Classes, Rarities, Slots, StatTypes } from "./consts";
import type { DwarfImage, MageImage, RangerImage, WarriorImage } from "./images";
import type { Percentage, String } from "./utilities";

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

type WarriorItem = {
	class: "Dragonknight";
	image: WarriorImage;
};

type RangerItem = {
	class: "Ranger";
	image: RangerImage;
};

type MageItem = {
	class: "Spellweaver";
	image: MageImage;
};

type DwarfItem = {
	class: "Steam Mechanicus";
	image: DwarfImage;
};

type BaseItem = Prettify<
	(WarriorItem | RangerItem | MageItem | DwarfItem) & {
		name: string;
		rarity: Rarity;
		slot: Slot;
		level: number;
		stats: BaseStat[];
	}
>;

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
	DwarfItem,
	Item,
	ItemSet,
	MageItem,
	MythicItem,
	RangerItem,
	Rarity,
	SetItem,
	Slot,
	StatType,
	UniqueItem,
	WarriorItem,
};
