import { v } from "convex/values";
import { Scrypt } from "lucia";
import { api } from "./_generated/api";
import { action } from "./_generated/server";

export const validatePassword = action({
	args: {
		password: v.string(),
		username: v.string(),
	},
	handler: async (ctx, args) => {
		const authAccount = await ctx.runQuery(api.queries.authAccounts.getAuthAccountByUsername, {
			username: args.username,
		});
		if (!authAccount || !authAccount.secret) {
			return { success: false, error: "User not found" };
		}
		const scrypt = new Scrypt();
		if (!(await scrypt.verify(authAccount.secret, args.password))) {
			return { success: false, error: "Invalid password" };
		}
		return { success: true };
	},
});
