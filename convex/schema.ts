import { Classes, Rarities, Slots, StatTypes } from "@/types/consts";
import { ContributionStatus } from "@/types/enums/contributions";
import { Roles } from "@/types/enums/roles";
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const setSchema = {
	class: v.union(
		v.literal(Classes.dragonknight),
		v.literal(Classes.ranger),
		v.literal(Classes.spellweaver),
		v.literal(Classes.steamMechanicus),
	),
	name: v.string(),
	items: v.array(v.string()),
	setBonus: v.array(
		v.object({
			requiredItems: v.number(),
			bonus: v.union(
				v.object({
					stat: v.string(),
					value: v.union(v.number(), v.string()),
				}),
				v.string(),
			),
		}),
	),
	approved: v.optional(v.boolean()),
	contributionStatus: v.optional(
		v.union(
			v.literal(ContributionStatus.pending),
			v.literal(ContributionStatus.approved),
			v.literal(ContributionStatus.rejected),
		),
	),
	contributorUsername: v.optional(v.string()),
};

export const itemSchema = {
	name: v.string(),
	class: v.union(
		v.literal(Classes.dragonknight),
		v.literal(Classes.ranger),
		v.literal(Classes.spellweaver),
		v.literal(Classes.steamMechanicus),
	),
	image: v.string(),
	rarity: v.union(v.literal(Rarities.setItem), v.literal(Rarities.uniqueItem), v.literal(Rarities.mythicItem)),
	slot: v.union(
		v.literal(Slots.ammo),
		v.literal(Slots.amulet),
		v.literal(Slots.armor),
		v.literal(Slots.axe),
		v.literal(Slots.banner),
		v.literal(Slots.battleShield),
		v.literal(Slots.belt),
		v.literal(Slots.book),
		v.literal(Slots.boots),
		v.literal(Slots.cloak),
		v.literal(Slots.focusCrystal),
		v.literal(Slots.gloves),
		v.literal(Slots.gun),
		v.literal(Slots.heavyGun),
		v.literal(Slots.helmet),
		v.literal(Slots.longAxe),
		v.literal(Slots.longMace),
		v.literal(Slots.longStaff),
		v.literal(Slots.longSword),
		v.literal(Slots.longbow),
		v.literal(Slots.mace),
		v.literal(Slots.orb),
		v.literal(Slots.pauldrons),
		v.literal(Slots.quiver),
		v.literal(Slots.ring),
		v.literal(Slots.shield),
		v.literal(Slots.shortbow),
		v.literal(Slots.siegeBow),
		v.literal(Slots.staff),
		v.literal(Slots.sword),
		v.literal(Slots.tool),
		v.literal(Slots.trophy),
	),
	level: v.number(),
	stats: v.array(
		v.object({
			stat: v.union(
				v.literal(StatTypes.allResistance),
				v.literal(StatTypes.andermagicResistance),
				v.literal(StatTypes.armorValue),
				v.literal(StatTypes.attacksPerSecond),
				v.literal(StatTypes.blockValue),
				v.literal(StatTypes.criticalValue),
				v.literal(StatTypes.damage),
				v.literal(StatTypes.fireResistance),
				v.literal(StatTypes.healthPoints),
				v.literal(StatTypes.iceResistance),
				v.literal(StatTypes.lightningResistance),
				v.literal(StatTypes.movementSpeed),
				v.literal(StatTypes.poisonResistance),
			),
			minValue: v.number(),
			maxValue: v.number(),
		}),
	),
	set: v.optional(v.object(setSchema)),
	uniqueBonus: v.optional(
		v.array(
			v.object({
				bonus: v.union(
					v.object({
						stat: v.union(
							v.literal(StatTypes.allResistance),
							v.literal(StatTypes.andermagicResistance),
							v.literal(StatTypes.armorValue),
							v.literal(StatTypes.attacksPerSecond),
							v.literal(StatTypes.blockValue),
							v.literal(StatTypes.criticalValue),
							v.literal(StatTypes.damage),
							v.literal(StatTypes.fireResistance),
							v.literal(StatTypes.healthPoints),
							v.literal(StatTypes.iceResistance),
							v.literal(StatTypes.lightningResistance),
							v.literal(StatTypes.movementSpeed),
							v.literal(StatTypes.poisonResistance),
						),
						value: v.union(v.number(), v.string()),
					}),
					v.string(),
				),
			}),
		),
	),
	approved: v.optional(v.boolean()),
	contributionStatus: v.optional(
		v.union(
			v.literal(ContributionStatus.pending),
			v.literal(ContributionStatus.approved),
			v.literal(ContributionStatus.rejected),
		),
	),
	contributorUsername: v.optional(v.string()),
};

const imageSchema = {
	imageName: v.string(),
	isMissing: v.boolean(),
};

const donationSchema = {
	donationId: v.string(),
	username: v.optional(v.string()),
	email: v.optional(v.string()),
};

const userSchema = {
	email: v.optional(v.string()),
	image: v.optional(v.string()),
	role: v.optional(v.union(v.literal(Roles.owner), v.literal(Roles.admin), v.literal(Roles.user))),
	// Legacy prod records from the pre-auth migration
	username: v.optional(v.string()),
	password: v.optional(v.string()),
	token: v.optional(
		v.object({
			id: v.string(),
			expires: v.string(),
		}),
	),
};

export default defineSchema({
	...authTables,
	items: defineTable(itemSchema),
	sets: defineTable(setSchema),
	dwarfImages: defineTable(imageSchema),
	mageImages: defineTable(imageSchema),
	warriorImages: defineTable(imageSchema),
	rangerImages: defineTable(imageSchema),
	donations: defineTable(donationSchema),
	users: defineTable(userSchema),
});
