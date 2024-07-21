import React from "react";
import { EmptySearch } from "./empty-search";
import { EmptyFaourites } from "./empty-favourite";
import { EmptyBoards } from "./empty-boards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./boardCard";
import { NewBoardButton } from "./new-board-button";
interface BoardListProps {
	org: string;
	query: {
		search?: string;
		favourite?: string;
	};
}
export const BoardList = ({ org, query }: BoardListProps) => {
	const data = useQuery(api.boards.get, { orgId: org });

	if (!data) {
		return (
			<div>
				<h2 className="text-3xl">
					{query.favourite ? "Favourite Boards" : "Team Boards"}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 mt-8 pb-10 gap-5">
					<NewBoardButton orgId={org} disabled />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
					<BoardCard.Skeleton />
				</div>
			</div>
		);
	}

	if (!data?.length && query.search) {
		return <EmptySearch />;
	}

	if (!data?.length && query.favourite) {
		return <EmptyFaourites />;
	}

	if (!data?.length) {
		return <EmptyBoards />;
	}

	return (
		<div>
			<h2 className="text-3xl">
				{query.favourite ? "Favourite Boards" : "Team Boards"}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 mt-8 pb-10 gap-5">
				<NewBoardButton orgId={org} />
				{data.map((board) => (
					<BoardCard
						key={board._id}
						id={board._id}
						title={board.title}
						imageUrl={board.imageUrl}
						authorId={board.authorId}
						authorName={board.authorName}
						createdAt={board._creationTime}
						orgId={board.orgId}
						isFavourite={false}
					/>
				))}
			</div>
		</div>
	);
};
