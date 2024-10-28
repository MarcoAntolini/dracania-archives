import type { Prettify } from "ts-hover-prettify";

type EffectLevels = "common" | "improved" | "magic" | "extraordinary" | "legendary";
type Effects = {
	[K in EffectLevels]?: string;
};
type ClassSpecificEffect = {
	ranger?: string;
	dragonknight?: string;
	spellweaver?: string;
	"steam-mechanicus"?: string;
};
type BaseJewel = {
	name: string;
	socketableAmount: number;
	isClassSpecific?: boolean;
	type?: "common" | "magic" | "mythic";
	image: string;
};

export type CommonJewel = Prettify<
	BaseJewel &
		(
			| {
					effect: Effects;
			  }
			| {
					isClassSpecific: true;
					effect: {
						[K in EffectLevels]?: ClassSpecificEffect;
					};
			  }
		)
>;
export type CommonJewelEffect = CommonJewel["effect"];

export type MagicJewel = Prettify<
	BaseJewel &
		(
			| {
					effect: {
						magic: string;
						extraordinary: string;
						legendary: string;
					};
			  }
			| {
					isClassSpecific: true;
					effect: {
						[K in EffectLevels]?: ClassSpecificEffect;
					};
			  }
		)
>;

export type MythicJewel = Prettify<
	BaseJewel &
		(
			| {
					effect: string;
			  }
			| {
					isClassSpecific: true;
					effect: ClassSpecificEffect;
			  }
		)
>;
export type MythicJewelEffect = MythicJewel["effect"];

export const jewels: (CommonJewel | MagicJewel | MythicJewel)[] = [
	{
		name: "Jewel of Relentlessness",
		effect: {
			common: "Resource cost reduced by 1%",
			improved: "Resource cost reduced by 2%",
			magic: "Resource cost reduced by 3%",
			extraordinary: "Resource cost reduced by 4%",
			legendary: "Resource cost reduced by 5%",
		},
		socketableAmount: 5,
		image: "/images/db/jewels/jewel_resource_cost.png",
	},
	{
		name: "Jewel of Focus",
		effect: {
			common: "Reduces cooldowns of all player skills by 1.50%",
			improved: "Reduces cooldowns of all player skills by 3.00%",
			magic: "Reduces cooldowns of all player skills by 4.50%",
			extraordinary: "Reduces cooldowns of all player skills by 6.00%",
			legendary: "Reduces cooldowns of all player skills by 7.50%",
		},
		socketableAmount: 5,
		image: "/images/db/jewels/jewel_skill_cooldown.png",
	},
	{
		name: "Jewel of Rage",
		effect: {
			common:
				"When dealing critical damage to an enemy, there is a 20% chance that your critical value increases by 10% and your attacks per second increase by 5% for 10 seconds.",
			improved:
				"When dealing critical damage to an enemy, there is a 25% chance that your critical value increases by 15% and your attacks per second increase by 10% for 10 seconds.",
			magic:
				"When dealing critical damage to an enemy, there is a 30% chance that your critical value increases by 20% and your attacks per second increase by 15% for 10 seconds.",
			extraordinary:
				"When dealing critical damage to an enemy, there is a 35% chance that your critical value increases by 25% and your attacks per second increase by 20% for 10 seconds.",
			legendary:
				"When dealing critical damage to an enemy, there is a 40% chance that your critical value increases by 30% and your attacks per second increase by 25% for 10 seconds.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_rage.png",
	},
	{
		name: "Jewel of Amplified Healing",
		effect: {
			common: "Picking up a healing sphere increases your damage by 25% and your movement speed by 5% for 5 seconds.",
			improved:
				"Picking up a healing sphere increases your damage by 50% and your movement speed by 10% for 5 seconds.",
			magic: "Picking up a healing sphere increases your damage by 75% and your movement speed by 15% for 5 seconds.",
			extraordinary:
				"Picking up a healing sphere increases your damage by 100% and your movement speed by 20% for 5 seconds.",
			legendary:
				"Picking up a healing sphere increases your damage by 150% and your movement speed by 25% for 5 seconds.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_amplified_healing.png",
	},
	{
		name: "Jewel of the Vanquisher",
		effect: {
			common: "Enhances the Frenzy of the Vanquisher effect:\n+ 0.005% additional critical value per stack.",
			improved: "Enhances the Frenzy of the Vanquisher effect:\n+ 0.015% additional critical value per stack.",
			magic: "Enhances the Frenzy of the Vanquisher effect:\n+ 0.03% additional critical value per stack.",
			extraordinary: "Enhances the Frenzy of the Vanquisher effect:\n+ 0.04% additional critical value per stack.",
			legendary: "Enhances the Frenzy of the Vanquisher effect:\n+ 0.05% additional critical value per stack.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_dtu.png",
	},
	{
		name: "Jewel of Contribution",
		effect: {
			common:
				"When dealing damage to an enemy, there is a 10% chance to trigger the Valuable Contribution buff for 10 seconds.\nThe buff increases your Health Points by 5% and regenerates 5% Resource per second of all group members (except you).\nThe buff does not stack.",
			improved:
				"When dealing damage to an enemy, there is a 12,5% chance to trigger the Valuable Contribution buff for 10 seconds.\nThe buff increases your Health Points by 7,5% and regenerates 5% Resource per second of all group members (except you).\nThe buff does not stack.",
			magic:
				"When dealing damage to an enemy, there is a 15% chance to trigger the Valuable Contribution buff for 10 seconds.\nThe buff increases your Health Points by 10% and regenerates 5% Resource per second of all group members (except you).\nThe buff does not stack.",
			extraordinary:
				"When dealing damage to an enemy, there is a 17,5% chance to trigger the Valuable Contribution buff for 10 seconds.\nThe buff increases your Health Points by 12,5% and regenerates 5% Resource per second of all group members (except you).\nThe buff does not stack.",
			legendary:
				"When dealing damage to an enemy, there is a 20% chance to trigger the Valuable Contribution buff for 10 seconds.\nThe buff increases your Health Points by 15% and regenerates 5% Resource per second of all group members (except you).\nThe buff does not stack.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_dtu_contribution.png",
	},
	{
		name: "Jewel of the Encouragement",
		effect: {
			common:
				"When dealing damage to an enemy, there is a 10% chance to trigger Increasing Encouragement buff for 10 seconds.\nThe buff increases your Resource by 5% and regenerates 5% Health Points per seconds of all group members (except you).\nThe buff does not stack.",
			improved:
				"When dealing damage to an enemy, there is a 12,5% chance to trigger Increasing Encouragement buff for 10 seconds.\nThe buff increases your Resource by 7,5% and regenerates 5% Health Points per seconds of all group members (except you).\nThe buff does not stack.",
			magic:
				"When dealing damage to an enemy, there is a 15% chance to trigger Increasing Encouragement buff for 10 seconds.\nThe buff increases your Resource by 10% and regenerates 5% Health Points per seconds of all group members (except you).\nThe buff does not stack.",
			extraordinary:
				"When dealing damage to an enemy, there is a 17,5% chance to trigger Increasing Encouragement buff for 10 seconds.\nThe buff increases your Resource by 12,5% and regenerates 5% Health Points per seconds of all group members (except you).\nThe buff does not stack.",
			legendary:
				"When dealing damage to an enemy, there is a 20% chance to trigger Increasing Encouragement buff for 10 seconds.\nThe buff increases your Resource by 15% and regenerates 5% Health Points per seconds of all group members (except you).\nThe buff does not stack.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_dtu_encouragement.png",
	},
	{
		name: "Jewel of Poisonus Thorns",
		effect: {
			common:
				"You shoot poisonus thorns every three seconds to all enemies around you in a range of 5 meters, dealing 10% of your base damage as poison damage. The poisonus thorns also deal 15% poisonus damage to you whenever it afflicts damage to an enemy.",
			improved:
				"You shoot poisonus thorns every three seconds to all enemies around you in a range of 5 meters, dealing 20% of your base damage as poison damage. The poisonus thorns also deal 20% poisonus damage to you whenever it afflicts damage to an enemy.",
			magic:
				"You shoot poisonus thorns every three seconds to all enemies around you in a range of 5 meters, dealing 30% of your base damage as poison damage. The poisonus thorns also deal 25% poisonus damage to you whenever it afflicts damage to an enemy.",
			extraordinary:
				"You shoot poisonus thorns every three seconds to all enemies around you in a range of 5 meters, dealing 40% of your base damage as poison damage. The poisonus thorns also deal 30% poisonus damage to you whenever it afflicts damage to an enemy.",
			legendary:
				"You shoot poisonus thorns every three seconds to all enemies around you in a range of 5 meters, dealing 50% of your base damage as poison damage. The poisonus thorns also deal 35% poisonus damage to you whenever it afflicts damage to an enemy.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_sewers.png",
	},
	{
		name: "Jewel of the Frozen Heart",
		effect: {
			common: "When you are hit while being frozen, you will be healed by 10% of your maximum Health Points.",
			improved: "When you are hit while being frozen, you will be healed by 20% of your maximum Health Points.",
			magic: "When you are hit while being frozen, you will be healed by 30% of your maximum Health Points.",
			extraordinary: "When you are hit while being frozen, you will be healed by 40% of your maximum Health Points.",
			legendary: "When you are hit while being frozen, you will be healed by 50% of your maximum Health Points.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_frozen_heart.png",
	},
	{
		name: "Jewel of Ghost Power",
		effect: {
			common:
				"Increases the damage bonus of the Ghost Power buff, granted by Gwenfara's main hand and off hand item, by 1%.",
			improved:
				"Increases the damage bonus of the Ghost Power buff, granted by Gwenfara's main hand and off hand item, by 2%.",
			magic:
				"Increases the damage bonus of the Ghost Power buff, granted by Gwenfara's main hand and off hand item, by 3%.",
			extraordinary:
				"Increases the damage bonus of the Ghost Power buff, granted by Gwenfara's main hand and off hand item, by 4%.",
			legendary:
				"Increases the damage bonus of the Ghost Power buff, granted by Gwenfara's main hand and off hand item, by 5%.",
		},
		socketableAmount: 3,
		image: "/images/db/jewels/jewel_halloween.png",
	},
	{
		name: "Thundering Flower Jewel",
		isClassSpecific: true,
		effect: {
			common: {
				ranger:
					"Each successful hit with Precise Shot has a 15% chance to cause 25% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
				dragonknight:
					"Each successful hit with Smash has a 10% chance to cause 20% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			improved: {
				ranger:
					"Each successful hit with Precise Shot has a 15% chance to cause 50% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
				dragonknight:
					"Each successful hit with Smash has a 10% chance to cause 40% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			magic: {
				ranger:
					"Each successful hit with Precise Shot has a 15% chance to cause 75% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
				dragonknight:
					"Each successful hit with Smash has a 10% chance to cause 60% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			extraordinary: {
				ranger:
					"Each successful hit with Precise Shot has a 15% chance to cause 100% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
				dragonknight:
					"Each successful hit with Smash has a 10% chance to cause 80% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			legendary: {
				ranger:
					"Each successful hit with Precise Shot has a 15% chance to cause 150% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
				dragonknight:
					"Each successful hit with Smash has a 10% chance to cause 100% of your base damage as Lightning damage to all enemies in a range of 5 meters around the hit enemy.",
			},
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_flower_thundering.png",
	},
	{
		name: "Fiery Flower Jewel",
		isClassSpecific: true,
		effect: {
			common: {
				spellweaver:
					"Each successfull hit with Fireball has a 15% chance to cause 25% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
				"steam-mechanicus":
					"Each successfull hit with Heavy Shot has a 20% chance to cause 30% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			improved: {
				spellweaver:
					"Each successfull hit with Fireball has a 15% chance to cause 50% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
				"steam-mechanicus":
					"Each successfull hit with Heavy Shot has a 20% chance to cause 60% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			magic: {
				spellweaver:
					"Each successfull hit with Fireball has a 15% chance to cause 75% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
				"steam-mechanicus":
					"Each successfull hit with Heavy Shot has a 20% chance to cause 90% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			extraordinary: {
				spellweaver:
					"Each successfull hit with Fireball has a 15% chance to cause 100% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
				"steam-mechanicus":
					"Each successfull hit with Heavy Shot has a 20% chance to cause 120% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
			},
			legendary: {
				spellweaver:
					"Each successfull hit with Fireball has a 15% chance to cause 150% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
				"steam-mechanicus":
					"Each successfull hit with Heavy Shot has a 20% chance to cause 180% of your base damage as Fire damage to all enemies in a range of 5 meters around the hit enemy.",
			},
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_flower_fiery.png",
	},
	{
		name: "Jewel of the Ingredient Hunter",
		effect: {
			common: "+ 1 drop stack size of all basic, boss and boss event ingredients",
			improved: "+ 2 drop stack size of all basic, boss and boss event ingredients",
			magic: "+ 3 drop stack size of all basic, boss and boss event ingredients",
			extraordinary: "+ 4 drop stack size of all basic, boss and boss event ingredients",
			legendary: "+ 5 drop stack size of all basic, boss and boss event ingredients",
		},
		socketableAmount: 3,
		image: "/images/db/jewels/jewel_ingredients.png",
	},
	{
		name: "Jewel of Gem Fortune",
		effect: {
			common: "Bosses drop 1 additional gem.",
			improved: "Bosses drop 2 additional gems.",
			magic: "Bosses drop 3 additional gems.",
			extraordinary: "Bosses drop 4 additional gems.",
			legendary: "Bosses drop 5 additional gems.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_gem_fortune.png",
	},
	{
		name: "Jewel of Lasting Health",
		effect: {
			common: "Defeating an enemy increases your health regeneration by 2% for 5 seconds.",
			improved: "Defeating an enemy increases your health regeneration by 4% for 5 seconds.",
			magic: "Defeating an enemy increases your health regeneration by 6% for 5 seconds.",
			extraordinary: "Defeating an enemy increases your health regeneration by 8% for 5 seconds.",
			legendary: "Defeating an enemy increases your health regeneration by 10% for 5 seconds.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_lasting_health.png",
	},
	{
		name: "Jewel of Vigor",
		effect: {
			common: "+ 2.00% damage",
			improved: "+ 4.00% damage",
			magic: "+ 6.00% damage",
			extraordinary: "+ 8.00% damage",
			legendary: "+ 10.00% damage",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_damage.png",
	},
	{
		name: "Jewel of Vitality",
		effect: {
			common: "+ 2.00% Health Points",
			improved: "+ 4.00% Health Points",
			magic: "+ 6.00% Health Points",
			extraordinary: "+ 8.00% Health Points",
			legendary: "+ 10.00% Health Points",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_health.png",
	},
	{
		name: "Jewel of Fortitude",
		effect: {
			common: "+ 2.00% Armor value",
			improved: "+ 4.00% Armor value",
			magic: "+ 6.00% Armor value",
			extraordinary: "+ 8.00% Armor value",
			legendary: "+ 10.00% Armor value",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_armor.png",
	},
	{
		name: "Jewel of Ambidextrous Vigor",
		effect: {
			common: "2.00% increased damage on two-handed weapons",
			improved: "4.00% increased damage on two-handed weapons",
			magic: "6.00% increased damage on two-handed weapons",
			extraordinary: "8.00% increased damage on two-handed weapons",
			legendary: "10.00% increased damage on two-handed weapons",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_2h_damage.png",
	},
	{
		name: "Jewel of Dextrous Vigor",
		effect: {
			common: "0.50% increased damage on one-handed weapons",
			improved: "1.00% increased damage on one-handed weapons",
			magic: "2.00% increased damage on one-handed weapons",
			extraordinary: "3.00% increased damage on one-handed weapons",
			legendary: "4.00% increased damage on one-handed weapons",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_1h_damage.png",
	},
	{
		name: "Jewel of Converse",
		effect: {
			common: "Whenever you get immobilized, your armor will be increased by 20% for 5 seconds.",
			improved: "Whenever you get immobilized, your armor will be increased by 30% for 5 seconds.",
			magic: "Whenever you get immobilized, your armor will be increased by 40% for 5 seconds.",
			extraordinary: "Whenever you get immobilized, your armor will be increased by 50% for 5 seconds.",
			legendary: "Whenever you get immobilized, your armor will be increased by 60% for 5 seconds.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_converse.png",
	},
	{
		name: "Jewel of Prolongation",
		effect: {
			common: "The duration of the stun immunity effect is increased by 2 seconds.",
			improved: "The duration of the stun immunity effect is increased by 3 seconds.",
			magic: "The duration of the stun immunity effect is increased by 4 seconds.",
			extraordinary: "The duration of the stun immunity effect is increased by 5 seconds.",
			legendary: "The duration of the stun immunity effect is increased by 6 seconds.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_stun_immunity.png",
	},
	{
		name: "Jewel of Pent-up Power",
		effect: {
			common:
				"Blocking generates Pent-up Power that lasts for 10 seconds.\nIf you stack up 100x Pent-up Power you will release an explosion that deals 1000% of your base damage as physical damage to all enemies around you.",
			improved:
				"Blocking generates Pent-up Power that lasts for 10 seconds.\nIf you stack up 100x Pent-up Power you will release an explosion that deals 1500% of your base damage as physical damage to all enemies around you.",
			magic:
				"Blocking generates Pent-up Power that lasts for 10 seconds.\nIf you stack up 100x Pent-up Power you will release an explosion that deals 2000% of your base damage as physical damage to all enemies around you.",
			extraordinary:
				"Blocking generates Pent-up Power that lasts for 10 seconds.\nIf you stack up 100x Pent-up Power you will release an explosion that deals 2500% of your base damage as physical damage to all enemies around you.",
			legendary:
				"Blocking generates Pent-up Power that lasts for 10 seconds.\nIf you stack up 100x Pent-up Power you will release an explosion that deals 3000% of your base damage as physical damage to all enemies around you.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_block.png",
	},
	{
		name: "Jewel of Revival Boon",
		effect: {
			common:
				"When you revive yourself at the place where you died your armor and damage will be increased by 20% for 10 seconds.",
			improved:
				"When you revive yourself at the place where you died your armor and damage will be increased by 25% for 10 seconds.",
			magic:
				"When you revive yourself at the place where you died your armor and damage will be increased by 30% for 10 seconds.",
			extraordinary:
				"When you revive yourself at the place where you died your armor and damage will be increased by 35% for 10 seconds.",
			legendary:
				"When you revive yourself at the place where you died your armor and damage will be increased by 40% for 10 seconds.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_revival.png",
	},
	{
		name: "Jewel of Swiftness",
		isClassSpecific: true,
		effect: {
			common: {
				ranger: "Dive and Blade Dance will cost 20% less Concentration if your health drop below 33%.",
				dragonknight: "Rage Jump and Charge will cost 20% less Rage if your health drop below 33%.",
				spellweaver: "Teleport and Frost Charge will cost 20% less Mana if your health drop below 33%.",
				"steam-mechanicus": "Rocket Pack and Iron Pounce will cost 20% less Steam if your health drop below 33%.",
			},
			improved: {
				ranger: "Dive and Blade Dance will cost 30% less Concentration if your health drop below 33%.",
				dragonknight: "Rage Jump and Charge will cost 30% less Rage if your health drop below 33%.",
				spellweaver: "Teleport and Frost Charge will cost 30% less Mana if your health drop below 33%.",
				"steam-mechanicus": "Rocket Pack and Iron Pounce will cost 30% less Steam if your health drop below 33%.",
			},
			magic: {
				ranger: "Dive and Blade Dance will cost 40% less Concentration if your health drop below 33%.",
				dragonknight: "Rage Jump and Charge will cost 40% less Rage if your health drop below 33%.",
				spellweaver: "Teleport and Frost Charge will cost 40% less Mana if your health drop below 33%.",
				"steam-mechanicus": "Rocket Pack and Iron Pounce will cost 40% less Steam if your health drop below 33%.",
			},
			extraordinary: {
				ranger: "Dive and Blade Dance will cost 50% less Concentration if your health drop below 33%.",
				dragonknight: "Rage Jump and Charge will cost 50% less Rage if your health drop below 33%.",
				spellweaver: "Teleport and Frost Charge will cost 50% less Mana if your health drop below 33%.",
				"steam-mechanicus": "Rocket Pack and Iron Pounce will cost 50% less Steam if your health drop below 33%.",
			},
			legendary: {
				ranger: "Dive and Blade Dance will cost 60% less Concentration if your health drop below 33%.",
				dragonknight: "Rage Jump and Charge will cost 60% less Rage if your health drop below 33%.",
				spellweaver: "Teleport and Frost Charge will cost 60% less Mana if your health drop below 33%.",
				"steam-mechanicus": "Rocket Pack and Iron Pounce will cost 60% less Steam if your health drop below 33%.",
			},
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_swiftness.png",
	},
	{
		name: "Jewel of the Easter Fever",
		effect: {
			common: "+ 1 drop stack size of Gilded Clovers",
			improved: "+ 2 drop stack size of Gilded Clovers",
			magic: "+ 3 drop stack size of Gilded Clovers",
			extraordinary: "+ 4 drop stack size of Gilded Clovers",
			legendary: "+ 5 drop stack size of Gilded Clovers",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_easter.png",
	},
	{
		name: "Jewel of Eternal Wrath",
		effect: {
			common: "+ 80% higher drop stack size of Fragments of Infernal Passage",
			improved: "+ 100% higher drop stack size of Fragments of Infernal Passage",
			magic: "+ 140% higher drop stack size of Fragments of Infernal Passage",
			extraordinary: "+ 180% higher drop stack size of Fragments of Infernal Passage",
			legendary: "+ 200% higher drop stack size of Fragments of Infernal Passage",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_infernal_passages.png",
	},
	{
		name: "Jewel of Eternal Scorn",
		isClassSpecific: true,
		type: "mythic",
		effect: {
			ranger:
				"+ 15.00% Critical Value\nEach successful hit with Scatter Shot has a chance of 5% to spawn an Ice Meteor on your location, dealing 150% of your base damage as Ice damage for 5 seconds to enemies in 5 meter radius.",
			dragonknight:
				"+ 15.00% Critical Value\nEach successful hit with Smash has a chance of 5% to spawn an Ice Meteor on your location, dealing 150% of your base damage as Ice damage for 5 seconds to enemies in 5 meter radius.",
			spellweaver:
				"+ 15.00% Critical Value\nEach successful hit with Ice Missile has a chance of 5% to spawn an Ice Meteor on your location, dealing 150% of your base damage as Ice damage for 5 seconds to enemies in 5 meter radius.",
			"steam-mechanicus":
				"+ 15.00% Critical Value\nEach successful hit with Flamethrower has a chance of 5% to spawn an Ice Meteor on your location, dealing 150% of your base damage as Ice damage for 5 seconds to enemies in 5 meter radius.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_winter.png",
	},
	{
		name: "Jewel of Strenuousness",
		type: "magic",
		effect: {
			magic: "+1 to the Key of Prowess drop stack size.",
			extraordinary: "+2 to the Key of Prowess drop stack size.",
			legendary: "+3 to the Key of Prowess drop stack size.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_strenuousness.png",
	},
	{
		name: "Jewel of Scorching Ray",
		type: "magic",
		effect: {
			magic:
				"When you block an enemy's skill, there is a 10% chance you will be healed by 10% of your maximum Health Points.",
			extraordinary:
				"When you block an enemy's skill, there is a 10% chance you will be healed by 20% of your maximum Health Points.",
			legendary:
				"When you block an enemy's skill, there is a 10% chance you will be healed by 40% of your maximum Health Points.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_scorching_ray.png",
	},
	{
		name: "Jewel of Ander Power",
		type: "magic",
		effect: {
			magic: "+ 4% drop stack size of andermants",
			extraordinary: "+ 6% drop stack size of andermants",
			legendary: "+ 8% drop stack size of andermants",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_ander_power.png",
	},
	{
		name: "Jewel of Glacial Fang",
		type: "magic",
		effect: {
			magic:
				"Each critical hit as a chance of 1% to spawn a Fenris Wolf fighting beside you for 10 seconds, at the expense of your Resistance values eing reduced by 7%.",
			extraordinary:
				"Each critical hit as a chance of 3% to spawn a Fenris Wolf fighting beside you for 10 seconds, at the expense of your Resistance values eing reduced by 7%.",
			legendary:
				"Each critical hit as a chance of 5% to spawn a Fenris Wolf fighting beside you for 10 seconds, at the expense of your Resistance values eing reduced by 7%.",
		},
		socketableAmount: 1,
		image: "/images/db/jewels/jewel_wolf.png",
	},
];
