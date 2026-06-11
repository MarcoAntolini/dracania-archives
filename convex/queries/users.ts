import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { query } from "../_generated/server";
export const getCurrentUser = query({
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			return {
				exists: false,
			};
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("_id"), userId))
			.first();
		return {
			id: userId,
			image: user?.image,
			role: user?.role,
			username: user?.email,
			exists: true,
		};
	},
});

export const getUserByUsername = query({
	args: {
		username: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("email"), args.username))
			.first();
		return user;
	},
});
