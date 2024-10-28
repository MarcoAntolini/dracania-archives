import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createToken = mutation({
	args: v.object({
		userId: v.id("users"),
	}),
	handler: async (ctx, args) => {
		const token = crypto.randomUUID();
		await ctx.db.patch(args.userId, {
			token: {
				id: token,
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
			},
		});
		return token;
	},
});

export const authenticateUserWithCredentials = mutation({
	args: v.object({
		username: v.string(),
		password: v.string(),
	}),
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("username"), args.username))
			.filter((q) => q.eq(q.field("password"), args.password))
			.first();
		if (!user) return { success: false, userId: undefined };
		return { success: true, userId: user._id };
	},
});

export const authenticateUserWithToken = mutation({
	args: v.object({
		token: v.string(),
	}),
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("token.id"), args.token))
			.filter((q) => q.gt(q.field("token.expires"), new Date().toISOString()))
			.first();
		return user ? { success: true } : { success: false };
	},
});
