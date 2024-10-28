import { v } from "convex/values";
import { query } from "../_generated/server";

export const authenticateUser = query({
	args: v.object({
		username: v.string(),
		password: v.string(),
	}),
	handler: async (ctx, args) => {
		return await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("username"), args.username))
			.filter((q) => q.eq(q.field("password"), args.password))
			.first();
	},
});
