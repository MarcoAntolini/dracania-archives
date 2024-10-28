import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const addDonation = mutation({
	args: {
		donationId: v.string(),
		username: v.optional(v.string()),
		email: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert("donations", args);
	},
});
