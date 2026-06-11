import { ContributionStatus } from "@/types/enums/contributions";
import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { getSetByName } from "../queries/sets";
import { setSchema } from "../schema";

export const createSet = mutation({
	args: setSchema,
	handler: async (ctx, args) => {
		const set = await getSetByName(ctx, { setName: args.name, class: args.class });
		if (set !== undefined) {
			throw new ConvexError("Set already exists");
		}
		const newSetId = await ctx.db.insert("sets", { ...args, approved: false });
		return newSetId;
	},
});

export const updateSetContributionStatus = mutation({
	args: {
		setId: v.id("sets"),
		contributionStatus: v.union(
			v.literal(ContributionStatus.approved),
			v.literal(ContributionStatus.pending),
			v.literal(ContributionStatus.rejected),
		),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.setId, { contributionStatus: args.contributionStatus });
	},
});
