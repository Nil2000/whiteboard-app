import { v } from "convex/values";

import { mutation } from "./_generated/server";

const images = [
	"/img1.png",
	"/img2.svg",
	"/img3.png",
	"/img4.png",
	"/img5.png",
	"/img6.png",
	"/img7.png",
];

export const createBoard = mutation({
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
