import { v } from "convex/values";

import { mutation } from "./_generated/server";

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
