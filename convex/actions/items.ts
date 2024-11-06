"use node";

import { sendHourlyContributionEmail } from "@/app/actions";
import type { Item } from "@/types/items";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";

export const sendHourlyEmail = internalAction({
	args: {},
	handler: async (ctx) => {
		const items = (await ctx.runQuery(internal.queries.items.getNewlyAddedItems)) as Item[];
		if (items.length === 0) return;
		await sendHourlyContributionEmail({ items });
	},
});
