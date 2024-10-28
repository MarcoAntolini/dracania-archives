import { Classes } from "@/types/consts";
import { ConvexError, v } from "convex/values";
import type { Id } from "../_generated/dataModel";
import { mutation } from "../_generated/server";
import { getImage } from "../queries/images";
import { getItemByName } from "../queries/items";
import { getSetByName } from "../queries/sets";
import { itemSchema } from "../schema";
import { setImageNotMissing } from "./images";

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
		const commonClassName =
			args.class === Classes.dragonknight
				? "warrior"
				: args.class === Classes.ranger
					? "ranger"
					: args.class === Classes.spellweaver
						? "mage"
						: "dwarf";
		const image = await getImage(ctx, {
			class: commonClassName,
			imageName: args.image,
		});
		await setImageNotMissing(ctx, {
			imageId: image?._id as Id<"dwarfImages"> | Id<"mageImages"> | Id<"warriorImages"> | Id<"rangerImages">,
			class: commonClassName,
		});
		return newItemId;
	},
});

export const approveItem = mutation({
	args: { itemId: v.id("items") },
	handler: async (ctx, args) => {
		try {
			await ctx.db.patch(args.itemId, { approved: true });
			return true;
		} catch (error) {
			return false;
		}
	},
});
