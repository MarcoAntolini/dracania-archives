import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const setImageNotMissing = internalMutation({
	args: {
		imageId: v.union(v.id("dwarfImages"), v.id("mageImages"), v.id("rangerImages"), v.id("warriorImages")),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.imageId, {
			isMissing: false,
		});
	},
});

export const setImageMissing = internalMutation({
	args: {
		imageId: v.union(v.id("dwarfImages"), v.id("mageImages"), v.id("rangerImages"), v.id("warriorImages")),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.imageId, {
			isMissing: true,
		});
	},
});
