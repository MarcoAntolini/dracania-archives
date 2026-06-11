import { Classes } from "@/types/consts";
import { ContributionStatus } from "@/types/enums/contributions";
import { v } from "convex/values";
import { internalQuery, query } from "../_generated/server";

export const getAllItems = query({
	handler: async (ctx) => {
		return await ctx.db.query("items").collect();
	},
});

export const getItemsByClass = query({
	args: {
		class: v.union(
			v.literal(Classes.dragonknight),
			v.literal(Classes.ranger),
			v.literal(Classes.spellweaver),
			v.literal(Classes.steamMechanicus),
		),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("items")
			.filter((q) => q.eq(q.field("class"), args.class))
			.collect();
	},
});

export const getItemByName = query({
	args: {
		class: v.union(
			v.literal(Classes.dragonknight),
			v.literal(Classes.ranger),
			v.literal(Classes.spellweaver),
			v.literal(Classes.steamMechanicus),
		),
		name: v.string(),
	},
	handler: async (ctx, args) => {
		return (await getItemsByClass(ctx, args)).find((item) => item.name === args.name);
	},
});

export const getApprovedItemsByClass = query({
	args: {
		class: v.union(
			v.literal(Classes.dragonknight),
			v.literal(Classes.ranger),
			v.literal(Classes.spellweaver),
			v.literal(Classes.steamMechanicus),
		),
	},
	handler: async (ctx, args) => {
		return (await getItemsByClass(ctx, args)).filter((item) => item.contributionStatus === ContributionStatus.approved);
	},
});

export const getApprovedItemByName = query({
	args: {
		class: v.union(
			v.literal(Classes.dragonknight),
			v.literal(Classes.ranger),
			v.literal(Classes.spellweaver),
			v.literal(Classes.steamMechanicus),
		),
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const item = (await getApprovedItemsByClass(ctx, args)).find((item) => item.name === args.name);
		if (!item) return null;
		return item;
	},
});

export const getNonApprovedItems = query({
	handler: async (ctx) => {
		return await ctx.db
			.query("items")
			.filter((q) => q.eq(q.field("contributionStatus"), ContributionStatus.pending))
			.collect();
	},
});

export const getRejectedItems = query({
	handler: async (ctx) => {
		return await ctx.db
			.query("items")
			.filter((q) => q.eq(q.field("contributionStatus"), ContributionStatus.rejected))
			.collect();
	},
});

export const getNewlyAddedItems = internalQuery({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query("items")
			.filter((q) => q.eq(q.field("contributionStatus"), ContributionStatus.pending))
			.filter((q) => q.gt(q.field("_creationTime"), new Date(Date.now() - 1 * 60 * 60 * 1000).getTime()))
			.collect();
	},
});
