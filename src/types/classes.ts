import { Classes } from "dso-database";

export const availableClasses = [
	{
		name: Classes.steamMechanicus,
		commonName: "steam-mechanicus",
	},
	{
		name: Classes.ranger,
		commonName: "ranger",
	},
	{
		name: Classes.spellweaver,
		commonName: "spellweaver",
	},
	{
		name: Classes.dragonknight,
		commonName: "dragonknight",
	},
] as const;
