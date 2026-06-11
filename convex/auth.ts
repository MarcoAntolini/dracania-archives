import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import type { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
	profile(params) {
		return {
			email: params.email as string,
			// role: (params.role as Roles) ?? Roles.user,
		};
	},
});

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [CustomPassword],
});
