"use node";

import { v } from "convex/values";
import { api } from "../_generated/api";
import { action } from "../_generated/server";

export const updateUser = action({
	args: {
		username: v.string(),
		image: v.string(),
		newPassword: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		await ctx.runMutation(api.mutations.users.updateUser, {
			username: args.username,
			image: args.image === "" ? undefined : args.image,
		});
		if (args.newPassword) {
			await ctx.runAction(api.actions.authAccounts.updateUserPassword, {
				username: args.username,
				newPassword: args.newPassword,
			});
		}
	},
});
