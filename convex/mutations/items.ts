import { Classes, Rarities, Slots, StatTypes } from "@/types/consts";
import { ContributionStatus } from "@/types/enums/contributions";
import { ConvexError, v } from "convex/values";
import type { Id } from "../_generated/dataModel";
import { mutation } from "../_generated/server";
import { getImage } from "../queries/images";
import { getItemByName } from "../queries/items";
import { getSetByName } from "../queries/sets";
import { itemSchema } from "../schema";
import { setImageMissing, setImageNotMissing } from "./images";

export const createItem = mutation({
	args: { ...itemSchema, setName: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const item = await getItemByName(ctx, { name: args.name, class: args.class });
		if (item !== undefined) {
			throw new ConvexError("Item already exists");
		}
		const set = args.setName ? await getSetByName(ctx, { setName: args.setName, class: args.class }) : undefined;
		const newItemId = await ctx.db.insert("items", {
			class: args.class,
			name: args.name,
			image: args.image,
			rarity: args.rarity,
			slot: args.slot,
			level: args.level,
			stats: args.stats,
			uniqueBonus: args.uniqueBonus || undefined,
			set: set || undefined,
			approved: false,
			contributorUsername: args.contributorUsername || undefined,
		});
		const image = await getImage(ctx, {
			class: args.class,
			imageName: args.image,
		});
		await setImageNotMissing(ctx, {
			imageId: image?._id as Id<"dwarfImages"> | Id<"mageImages"> | Id<"warriorImages"> | Id<"rangerImages">,
		});
		return newItemId;
	},
});

export const updateItem = mutation({
	args: {
		_id: v.id("items"),
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
		setName: v.optional(v.string()),
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
	},
	handler: async (ctx, args) => {
		const set = args.setName ? await getSetByName(ctx, { setName: args.setName, class: args.class }) : undefined;
		await ctx.db.patch(args._id, {
			...args,
			set: set || undefined,
		});
	},
});

export const updateItemContributionStatus = mutation({
	args: {
		itemId: v.id("items"),
		contributionStatus: v.union(
			v.literal(ContributionStatus.approved),
			v.literal(ContributionStatus.pending),
			v.literal(ContributionStatus.rejected),
		),
	},
	handler: async (ctx, args) => {
		try {
			await ctx.db.patch(args.itemId, { contributionStatus: args.contributionStatus });
			return true;
		} catch (error) {
			return false;
		}
	},
});

export const deleteItem = mutation({
	args: { ...itemSchema, _id: v.id("items") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args._id);
		const image = await getImage(ctx, {
			class: args.class,
			imageName: args.image,
		});
		await setImageMissing(ctx, {
			imageId: image?._id as Id<"dwarfImages"> | Id<"mageImages"> | Id<"rangerImages"> | Id<"warriorImages">,
		});
	},
});
