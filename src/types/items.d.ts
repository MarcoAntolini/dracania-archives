import { type Prettify } from "ts-hover-prettify";

type Class = "Dragonknight" | "Ranger" | "Spellweaver" | "Steam Mechanicus";

type ItemType = "Set Item" | "Unique Item" | "Mythic Item";

type Slot =
	| "Head, Helmet"
	| "Shoulders, Pauldrons"
	| "Torso, Armor"
	| "Hands, Gloves"
	| "Legs, Boots"
	| "Back, Cloak"
	| "Back, Banner"
	| "Neck, Amulet"
	| "Hips, Belt"
	| "Ring Finger, Ring"
	| "Weapon Adornment, Ammo"
	| "Weapon Adornment, Trophy"
	| "Weapon Adornment, Focus Crystal"
	| "Weapon Adornment, Ammo" // TODO warrior
	| "Double-Handed, Heavy Gun"
	| "Double-Handed, Siege Bow"
	| "Double-Handed, Staff"
	| "Double-Handed, Sword"
	| "Double-Handed, Axe"
	| "Double-Handed, Mace"
	| "Main Hand, Gun"
	| "Main Hand, Shortbow"
	| "Main Hand, Longbow"
	| "Main Hand, Staff"
	| "Main Hand, Sword"
	| "Main Hand, Axe"
	| "Main Hand, Mace"
	| "Off Hand, Tool"
	| "Off Hand, Shield"
	| "Off Hand, Quiver"
	| "Off Hand, Orb"
	| "Off Hand, Book"
	| "Off Hand, Tool"; // TODO offensive shield

type StatType =
	| "Damage"
	| "Critical Value"
	| "Attacks per Second"
	| "Movement Speed"
	| "Health Points"
	| "Armor Value"
	| "Block Value"
	| "All Resistance"
	| "Fire Resistance"
	| "Poison Resistance"
	| "Ice Resistance"
	| "Lightning Resistance"
	| "Andermagic Resistance";

type Stat = {
	stat: StatType;
	minValue: number;
	maxValue: number;
};

type BaseItem = {
	image: string;
	class: Class;
	name: string;
	slot: Slot;
	level: number;
	stats: Stat[];
};

type ItemSet = {
	name: string;
	items: string[];
	bonus: {
		requiredItems: number;
		value: string;
	}[];
};

type SetItem = Prettify<
	BaseItem & {
		type: "Set Item";
		set: ItemSet;
	}
>;

type UniqueItem = Prettify<
	BaseItem & {
		type: "Unique Item";
		uniqueBonus: string[];
	}
>;

type MythicItem = Prettify<
	BaseItem & {
		type: "Mythic Item";
		set?: ItemSet | undefined;
		uniqueBonus?: string[] | undefined;
	}
>;

type Item = SetItem | UniqueItem | MythicItem;
