import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateUser = mutation({
	args: {
		username: v.string(),
		image: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return;
		await ctx.db.patch(userId, {
			email: args.username,
			image: args.image,
		});
	},
});
