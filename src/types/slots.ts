import { Slots } from "dso-database";

export const availableSlots = [
	{
		commonName: "Helmet",
		itemSlot: Slots.helmet,
	},
	{
		commonName: "Pauldrons",
		itemSlot: Slots.pauldrons,
	},
	{
		commonName: "Torso",
		itemSlot: Slots.armor,
	},
	{
		commonName: "Gloves",
		itemSlot: Slots.gloves,
	},
	{
		commonName: "Boots",
		itemSlot: Slots.boots,
	},
	{
		commonName: "Back",
		itemSlot: [Slots.cloak, Slots.banner],
	},
	{
		commonName: "Amulet",
		itemSlot: Slots.amulet,
	},
	{
		commonName: "Belt",
		itemSlot: Slots.belt,
	},
	{
		commonName: "Ring",
		itemSlot: Slots.ring,
	},
	{
		commonName: "Adornment",
		itemSlot: [Slots.ammo, Slots.focusCrystal, Slots.trophy],
	},
	{
		commonName: "Double Handed",
		itemSlot: [Slots.heavyGun, Slots.siegeBow, Slots.longStaff, Slots.longSword, Slots.longAxe, Slots.longMace],
	},
	{
		commonName: "Main Hand",
		itemSlot: [Slots.gun, Slots.shortbow, Slots.longbow, Slots.staff, Slots.sword, Slots.axe, Slots.mace],
	},
	{
		commonName: "Off Hand",
		itemSlot: [Slots.tool, Slots.shield, Slots.quiver, Slots.orb, Slots.book, Slots.battleShield],
	},
] as const;
