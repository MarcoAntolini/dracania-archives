"use node";

import { ContributionStatus } from "@/types/enums/contributions";
import { api } from "../_generated/api";
import { action } from "../_generated/server";

export const changeContributionStatus = action({
	handler: async (ctx) => {
		const sets = await ctx.runQuery(api.queries.sets.getAllSets);
		for (const set of sets) {
			await ctx.runMutation(api.mutations.sets.updateSetContributionStatus, {
				setId: set._id,
				contributionStatus: set.approved ? ContributionStatus.approved : ContributionStatus.pending,
			});
		}
		const items = await ctx.runQuery(api.queries.items.getAllItems);
		for (const item of items) {
			await ctx.runMutation(api.mutations.items.updateItemContributionStatus, {
				itemId: item._id,
				contributionStatus: item.approved ? ContributionStatus.approved : ContributionStatus.pending,
			});
		}
	},
});
