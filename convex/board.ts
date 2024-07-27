import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const images = [
	"placeholders/img1.svg",
	"placeholders/img2.svg",
	"placeholders/img3.svg",
	"placeholders/img4.svg",
	"placeholders/img5.svg",
	"placeholders/img6.svg",
	"placeholders/img7.svg",
	"placeholders/img8.svg",
	"placeholders/img9.svg",
	"placeholders/img10.svg",
];

export const create = mutation({
	args: {
		orgId: v.string(),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		const id = await ctx.auth.getUserIdentity();

		if (!id) {
			throw new Error("Unauthorized");
		}

		const randomImg = images[Math.floor(Math.random() * images.length)];

		const board = await ctx.db.insert("boards", {
			title: args.title,
			orgId: args.orgId,
			authorId: id.subject,
			authorName: id.name!,
			imageUrl: randomImg,
		});
		return board;
	},
});

export const remove = mutation({
	args: {
		id: v.id("boards"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Unauthorized");
		}

		const existingFav = await ctx.db
			.query("userFavourites")
			.withIndex("by_user_board", (q) =>
				q.eq("userId", identity.subject).eq("boardId", args.id)
			)
			.unique();
		if (existingFav) {
			await ctx.db.delete(existingFav._id);
		}

		await ctx.db.delete(args.id);
	},
});

export const update = mutation({
	args: { id: v.id("boards"), title: v.string() },
	handler: async (ctx, args) => {
		const userId = await ctx.auth.getUserIdentity();
		if (!userId) {
			throw new Error("Unauthorized");
		}
		const title = args.title.trim();

		if (!title) {
			throw new Error("Title cannot be empty");
		}

		if (title.length > 60) {
			throw new Error("Title cannot be more than 100 characters");
		}

		const board = await ctx.db.patch(args.id, { title });
		return board;
	},
});

export const favourite = mutation({
	args: { id: v.id("boards"), orgId: v.string() },
	handler: async (ctx, args) => {
		const userId = await ctx.auth.getUserIdentity();
		if (!userId) {
			throw new Error("Unauthorized");
		}
		const board = await ctx.db.get(args.id);
		if (!board) {
			throw new Error("Board not found");
		}

		const existing = await ctx.db
			.query("userFavourites")
			.withIndex("by_user_board", (q) =>
				q.eq("userId", userId.subject).eq("boardId", board._id)
			)
			.unique();

		if (existing) {
			throw new Error("Already favourited");
		}

		await ctx.db.insert("userFavourites", {
			userId: userId.subject,
			boardId: args.id,
			orgId: args.orgId,
		});
		return board;
	},
});

export const unfavourite = mutation({
	args: { id: v.id("boards") },
	handler: async (ctx, args) => {
		const userId = await ctx.auth.getUserIdentity();
		if (!userId) {
			throw new Error("Unauthorized");
		}
		const board = await ctx.db.get(args.id);
		if (!board) {
			throw new Error("Board not found");
		}

		const existing = await ctx.db
			.query("userFavourites")
			.withIndex("by_user_board", (q) =>
				q.eq("userId", userId.subject).eq("boardId", board._id)
			)
			.unique();

		if (!existing) {
			throw new Error("Favourite board not found");
		}

		await ctx.db.delete(existing._id);
		return board;
	},
});

export const get = query({
	args: { id: v.id("boards") },
	handler: async (ctx, args) => {
		const board = await ctx.db.get(args.id);
		if (!board) {
			throw new Error("Board not found");
		}
		return board;
	},
});
