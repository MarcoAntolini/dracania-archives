const Classes = {
	dragonknight: "Dragonknight",
	ranger: "Ranger",
	spellweaver: "Spellweaver",
	steamMechanicus: "Steam Mechanicus",
} as const;

const Rarities = {
	setItem: "Set Item",
	uniqueItem: "Unique Item",
	mythicItem: "Mythic Item",
} as const;

const Slots = {
	helmet: "Head, Helmet",
	pauldrons: "Shoulders, Pauldrons",
	armor: "Torso, Armor",
	gloves: "Hands, Gloves",
	boots: "Legs, Boots",
	cloak: "Back, Cloak",
	banner: "Back, Banner",
	amulet: "Neck, Amulet",
	belt: "Hips, Belt",
	ring: "Ring Finger, Ring",
	ammo: "Weapon Adornment, Ammo",
	focusCrystal: "Weapon Adornment, Focus Crystal",
	trophy: "Weapon Adornment, Trophy",
	heavyGun: "Double-Handed, Heavy Gun",
	siegeBow: "Double-Handed, Siege Bow",
	longStaff: "Double-Handed, Staff",
	longSword: "Double-Handed, Sword",
	longAxe: "Double-Handed, Axe",
	longMace: "Double-Handed, Mace",
	gun: "Main Hand, Gun",
	shortbow: "Main Hand, Shortbow",
	longbow: "Main Hand, Longbow",
	staff: "Main Hand, Staff",
	sword: "Main Hand, Sword",
	axe: "Main Hand, Axe",
	mace: "Main Hand, Mace",
	tool: "Off Hand, Tool",
	shield: "Off Hand, Shield",
	quiver: "Off Hand, Quiver",
	orb: "Off Hand, Orb",
	book: "Off Hand, Book",
	battleShield: "Off Hand, Battle Shield",
} as const;

const StatTypes = {
	damage: "Damage",
	criticalValue: "Critical Value",
	attacksPerSecond: "Attacks per Second",
	movementSpeed: "Movement Speed",
	healthPoints: "Health Points",
	armorValue: "Armor Value",
	blockValue: "Block Value",
	allResistance: "All Resistance",
	fireResistance: "Fire Resistance",
	poisonResistance: "Poison Resistance",
	iceResistance: "Ice Resistance",
	lightningResistance: "Lightning Resistance",
	andermagicResistance: "Andermagic Resistance",
} as const;

export { Classes, Rarities, Slots, StatTypes };
