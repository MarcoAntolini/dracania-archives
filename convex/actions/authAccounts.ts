"use node";

import { modifyAccountCredentials } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { action } from "../_generated/server";

export const updateUserPassword = action({
	args: {
		newPassword: v.string(),
		username: v.string(),
	},
	handler: async (ctx, args) => {
		return await modifyAccountCredentials(ctx, {
			provider: "password",
			account: {
				id: args.username,
				secret: args.newPassword,
			},
		});
	},
});
