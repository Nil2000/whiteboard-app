import { query } from "./_generated/server";
import { v } from "convex/values";
import { getAllOrThrow, getAll } from "convex-helpers/server/relationships";
export const get = query({
	args: {
		orgId: v.string(),
		title: v.optional(v.string()),
		favourites: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Unauthorized");
		}

		if (args.favourites) {
			const favBoards = await ctx.db
				.query("userFavourites")
				.withIndex("by_user_org", (q) =>
					q.eq("userId", identity.subject).eq("orgId", args.orgId)
				)
				.order("desc")
				.collect();

			const ids = favBoards.map((fav) => fav.boardId);

			const boards = await getAllOrThrow(ctx.db, ids);

			return boards.map((board) => ({ ...board, isFavourite: true }));
		}

		let boards = [];
		const title = args.title as string;
		if (title) {
			boards = await ctx.db
				.query("boards")
				.withSearchIndex("search_title", (q) =>
					q.search("title", title).eq("orgId", args.orgId)
				)
				.collect();
		} else {
			boards = await ctx.db
				.query("boards")
				.withIndex("by_org", (q) => q.eq("orgId", args.orgId))
				.order("desc")
				.collect();
		}

		const boardsWithFavRelation = boards.map((board) => {
			return ctx.db
				.query("userFavourites")
				.withIndex("by_user_board", (q) =>
					q.eq("userId", identity.subject).eq("boardId", board._id)
				)
				.unique()
				.then((fav) => {
					return { ...board, isFavourite: !!fav };
				});
		});

		const boardsWithFav = await Promise.all(boardsWithFavRelation);

		return boardsWithFav;
	},
});
