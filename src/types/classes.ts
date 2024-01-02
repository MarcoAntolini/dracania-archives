import { Classes } from "dso-database";

export const availableClasses = [
	{
		name: Classes.steamMechanicus,
		commonName: "dwarf",
	},
	{
		name: Classes.ranger,
		commonName: "ranger",
	},
	{
		name: Classes.spellweaver,
		commonName: "mage",
	},
	{
		name: Classes.dragonknight,
		commonName: "warrior",
	},
] as const;
