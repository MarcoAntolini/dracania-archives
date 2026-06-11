import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAuthAccountByUsername = query({
	args: {
		username: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("authAccounts")
			.filter((q) => q.eq(q.field("providerAccountId"), args.username))
			.first();
	},
});
