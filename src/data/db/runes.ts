import type { Prettify } from "ts-hover-prettify";

export type RuneEffect = {
	common: string;
	improved: string;
	magic: string;
	extraordinary: string;
	legendary: string;
};
type BaseRune = {
	name: string;
	image: string;
	socketableAmount: number;
	type?: "common" | "unique";
};

export type CommonRune = Prettify<
	BaseRune & {
		effect: RuneEffect;
	}
>;
export type UniqueRune = Prettify<
	BaseRune & {
		effect: string;
	}
>;

export const runes: (CommonRune | UniqueRune)[] = [
	{
		name: "Rune of Vitality",
		effect: {
			common: "+ 1.30% Health Points",
			improved: "+ 2.60% Health Points",
			magic: "+ 3.90% Health Points",
			extraordinary: "+ 5.20% Health Points",
			legendary: "+ 6.50% Health Points",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_health.png",
	},
	{
		name: "Rune of Regeneration",
		effect: {
			common: "Regenerates 1.30% of your Health Points per second.",
			improved: "Regenerates 2.60% of your Health Points per second.",
			magic: "Regenerates 3.90% of your Health Points per second.",
			extraordinary: "Regenerates 5.20% of your Health Points per second.",
			legendary: "Regenerates 6.50% of your Health Points per second.",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_health_regen.png",
	},
	{
		name: "Rune of Fortitude",
		effect: {
			common: "+ 1.30% Armor value",
			improved: "+ 2.60% Armor value",
			magic: "+ 3.90% Armor value",
			extraordinary: "+ 5.20% Armor value",
			legendary: "+ 6.50% Armor value",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_armor.png",
	},
	{
		name: "Rune of Resilience",
		effect: {
			common: "+ 1.30% all resistance values",
			improved: "+ 2.60% all resistance values",
			magic: "+ 3.90% all resistance values",
			extraordinary: "+ 5.20% all resistance values",
			legendary: "+ 6.50% all resistance values",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resistance.png",
	},
	{
		name: "Rune of Fire Resilience",
		effect: {
			common: "+ 1.30% Fire resistance",
			improved: "+ 2.60% Fire resistance",
			magic: "+ 3.90% Fire resistance",
			extraordinary: "+ 5.20% Fire resistance",
			legendary: "+ 6.50% Fire resistance",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resistance_fire.png",
	},
	{
		name: "Rune of Ice Resilience",
		effect: {
			common: "+ 1.30% Ice resistance",
			improved: "+ 2.60% Ice resistance",
			magic: "+ 3.90% Ice resistance",
			extraordinary: "+ 5.20% Ice resistance",
			legendary: "+ 6.50% Ice resistance",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resistance_ice.png",
	},
	{
		name: "Rune of Lightning Resilience",
		effect: {
			common: "+ 1.30% Lightning resistance",
			improved: "+ 2.60% Lightning resistance",
			magic: "+ 3.90% Lightning resistance",
			extraordinary: "+ 5.20% Lightning resistance",
			legendary: "+ 6.50% Lightning resistance",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resistance_lightning.png",
	},
	{
		name: "Rune of Poison Resilience",
		effect: {
			common: "+ 1.30% Poison resistance",
			improved: "+ 2.60% Poison resistance",
			magic: "+ 3.90% Poison resistance",
			extraordinary: "+ 5.20% Poison resistance",
			legendary: "+ 6.50% Poison resistance",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resistance_poison.png",
	},
	{
		name: "Rune of Andermagic Resilience",
		effect: {
			common: "+ 1.30% Andermagic resistance",
			improved: "+ 2.60% Andermagic resistance",
			magic: "+ 3.90% Andermagic resistance",
			extraordinary: "+ 5.20% Andermagic resistance",
			legendary: "+ 6.50% Andermagic resistance",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resistance_andermagic.png",
	},
	{
		name: "Rune of Devastation",
		effect: {
			common: "+ 1.30% critical value",
			improved: "+ 2.60% critical value",
			magic: "+ 3.90% critical value",
			extraordinary: "+ 5.20% critical value",
			legendary: "+ 6.50% critical value",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_critical.png",
	},
	{
		name: "Rune of Vigor",
		effect: {
			common: "+ 1.30% damage",
			improved: "+ 2.60% damage",
			magic: "+ 3.90% damage",
			extraordinary: "+ 5.20% damage",
			legendary: "+ 6.50% damage",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_damage.png",
	},
	{
		name: "Rune of Persistence",
		effect: {
			common: "+ 1.30% block value",
			improved: "+ 2.60% block value",
			magic: "+ 3.90% block value",
			extraordinary: "+ 5.20% block value",
			legendary: "+ 6.50% block value",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_block.png",
	},
	{
		name: "Rune of Celerity",
		effect: {
			common: "+ 1.30% attack speed",
			improved: "+ 2.60% attack speed",
			magic: "+ 3.90% attack speed",
			extraordinary: "+ 5.20% attack speed",
			legendary: "+ 6.50% attack speed",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_attack_speed.png",
	},
	{
		name: "Rune of Acceleration",
		effect: {
			common: "+ 1.30% movement speed",
			improved: "+ 2.60% movement speed",
			magic: "+ 3.90% movement speed",
			extraordinary: "+ 5.20% movement speed",
			legendary: "+ 6.50% movement speed",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_movement_speed.png",
	},
	{
		name: "Rune of Efficacy",
		effect: {
			common: "+ 1.30% Resource",
			improved: "+ 2.60% Resource",
			magic: "+ 3.90% Resource",
			extraordinary: "+ 5.20% Resource",
			legendary: "+ 6.50% Resource",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resource.png",
	},
	{
		name: "Rune of Recharging",
		effect: {
			common: "Regenerates 1.30% Resource per second.",
			improved: "Regenerates 2.60% Resource per second.",
			magic: "Regenerates 3.90% Resource per second.",
			extraordinary: "Regenerates 5.20% Resource per second.",
			legendary: "Regenerates 6.50% Resource per second.",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_resource_regen.png",
	},
	{
		name: "Rune of Materi Blessing",
		effect: {
			common: "+ 10% to Materi Fragments drop stack size.",
			improved: "+ 15% to Materi Fragments drop stack size.",
			magic: "+ 20% to Materi Fragments drop stack size.",
			extraordinary: "+ 25% to Materi Fragments drop stack size.",
			legendary: "+ 30% to Materi Fragments drop stack size.",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_materi_find.png",
	},
	{
		name: "Rune of the Wisdom Seeker",
		effect: {
			common: "+ 10% to Ancient Wisdom drop stack size.",
			improved: "+ 15% to Ancient Wisdom drop stack size.",
			magic: "+ 20% to Ancient Wisdom drop stack size.",
			extraordinary: "+ 40% to Ancient Wisdom drop stack size.",
			legendary: "+ 50% to Ancient Wisdom drop stack size.",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_wisdom_find.png",
	},
	{
		name: "Rune of Insight",
		effect: {
			common: "+ 2.50% experience points when defeating enemies.",
			improved: "+ 5.00% experience points when defeating enemies.",
			magic: "+ 10.00% experience points when defeating enemies.",
			extraordinary: "+ 15.00% experience points when defeating enemies.",
			legendary: "+ 20.00% experience points when defeating enemies.",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_xp_gain.png",
	},
	{
		name: "Rune of the Andermant Fever",
		effect: {
			common: "Increases the Andermant Fever talent by 1.",
			improved: "Increases the Andermant Fever talent by 2.",
			magic: "Increases the Andermant Fever talent by 3.",
			extraordinary: "Increases the Andermant Fever talent by 4.",
			legendary: "Increases the Andermant Fever talent by 5.",
		},
		socketableAmount: 1,
		image: "/images/db/runes/rune_more_andermant.png",
	},
	{
		name: "Rune of the Scholar",
		effect: {
			common: "Increases the Scholar talent by 1.",
			improved: "Increases the Scholar talent by 2.",
			magic: "Increases the Scholar talent by 3.",
			extraordinary: "Increases the Scholar talent by 4.",
			legendary: "Increases the Scholar talent by 5.",
		},
		socketableAmount: 1,
		image: "/images/db/runes/rune_more_wisdom.png",
	},
	{
		name: "Rune of the Experience Hunter",
		effect: {
			common: "Increases the Experience Hunter talent by 1.",
			improved: "Increases the Experience Hunter talent by 2.",
			magic: "Increases the Experience Hunter talent by 3.",
			extraordinary: "Increases the Experience Hunter talent by 4.",
			legendary: "Increases the Experience Hunter talent by 5.",
		},
		socketableAmount: 1,
		image: "/images/db/runes/rune_more_xp.png",
	},
	{
		name: "Rune of the Anxiety Keeper",
		effect: {
			common: "Increases the Anxiety Keeper talent by 1.",
			improved: "Increases the Anxiety Keeper talent by 2.",
			magic: "Increases the Anxiety Keeper talent by 3.",
			extraordinary: "Increases the Anxiety Keeper talent by 4.",
			legendary: "Increases the Anxiety Keeper talent by 5.",
		},
		socketableAmount: 1,
		image: "/images/db/runes/rune_more_soulshard.png",
	},
	{
		name: "Rune of the Gold Fever",
		effect: {
			common: "Increases the Gold Fever talent by 1.",
			improved: "Increases the Gold Fever talent by 2.",
			magic: "Increases the Gold Fever talent by 3.",
			extraordinary: "Increases the Gold Fever talent by 4.",
			legendary: "Increases the Gold Fever talent by 5.",
		},
		socketableAmount: 1,
		image: "/images/db/runes/rune_more_currency.png",
	},
	{
		name: "Rune of the Realm Changer",
		effect: {
			common: "Increases the Realm Changer talent by 1.",
			improved: "Increases the Realm Changer talent by 2.",
			magic: "Increases the Realm Changer talent by 3.",
			extraordinary: "Increases the Realm Changer talent by 4.",
			legendary: "Increases the Realm Changer talent by 5.",
		},
		socketableAmount: 1,
		image: "/images/db/runes/rune_more_realmfragment.png",
	},
	{
		name: "Concentrated Solstice Rune",
		effect: {
			common: "+ 1.30% Ice Resistance\n+ 1.30% Health Points\n+ 1.30% critical value",
			improved: "+ 2.60% Ice Resistance\n+ 2.60% Health Points\n+ 2.60% critical value",
			magic: "+ 3.90% Ice Resistance\n+ 3.90% Health Points\n+ 3.90% critical value",
			extraordinary: "+ 5.20% Ice Resistance\n+ 5.20% Health Points\n+ 5.20% critical value",
			legendary: "+ 6.50% Ice Resistance\n+ 6.50% Health Points\n+ 6.50% critical value",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_concentrated_winter.png",
	},
	{
		name: "Concentrated Spring Rune",
		effect: {
			common: "+ 1.30% Health Points\n+ 1.30% critical value\n+ 1.30% attack speed",
			improved: "+ 2.60% Health Points\n+ 2.60% critical value\n+ 2.60% attack speed",
			magic: "+ 3.90% Health Points\n+ 3.90% critical value\n+ 3.90% attack speed",
			extraordinary: "+ 5.20% Health Points\n+ 5.20% critical value\n+ 5.20% attack speed",
			legendary: "+ 6.50% Health Points\n+ 6.50% critical value\n+ 6.50% attack speed",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_concentrated_spring.png",
	},
	{
		name: "Concentrated Summer Rune",
		effect: {
			common: "+ 1.30% all resistance values\n+ 1.30% damage\n+ 1.30% block value",
			improved: "+ 2.60% all resistance values\n+ 2.60% damage\n+ 2.60% block value",
			magic: "+ 3.90% all resistance values\n+ 3.90% damage\n+ 3.90% block value",
			extraordinary: "+ 5.20% all resistance values\n+ 5.20% damage\n+ 5.20% block value",
			legendary: "+ 6.50% all resistance values\n+ 6.50% damage\n+ 6.50% block value",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_concentrated_summer.png",
	},
	{
		name: "Concentrated Autumn Rune",
		effect: {
			common: "+ 1.00% drop stack size of andermants\n+ 1.30% movement speed\n+ 1.30% damage",
			improved: "+ 2.00% drop stack size of andermants\n+ 2.60% movement speed\n+ 2.60% damage",
			magic: "+ 3.00% drop stack size of andermants\n+ 3.90% movement speed\n+ 3.90% damage",
			extraordinary: "+ 4.00% drop stack size of andermants\n+ 5.20% movement speed\n+ 5.20% damage",
			legendary: "+ 5.00% drop stack size of andermants\n+ 6.50% movement speed\n+ 6.50% damage",
		},
		socketableAmount: 5,
		image: "/images/db/runes/rune_concentrated_autumn.png",
	},
	{
		name: "Rune of Increasing Power",
		type: "unique",
		effect:
			"+ 15.00% Armor value\n+ 5.00% Fire resistance\n+ 5.00% Poison resistance\n+ 5.00% Ice resistance\n+ 5.00% Lightning resistance\nWhen you deal critical damage to an enemy, there is a 5% chance to petrify the enemy for 2 seconds.",
		socketableAmount: 1,
		image: "/images/db/runes/rune_increasing_power.png",
	},
	{
		name: "Rune of Growing Power",
		type: "unique",
		effect:
			"+ 10.00% movement speed\n+ 6.00% attack speed\nWhen you deal critical damage to an enemy, there is an 8% chance to gain the Phantom Smoke effect, which makes you invulnerable to damage and invisible to monsters for 3 seconds.\nCooldown: 15 seconds",
		socketableAmount: 1,
		image: "/images/db/runes/rune_growing_power.png",
	},
];
