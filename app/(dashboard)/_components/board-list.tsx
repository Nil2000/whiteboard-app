import React from "react";
import { EmptySearch } from "./empty-search";
import { EmptyFaourites } from "./empty-favourite";
import { EmptyBoards } from "./empty-boards";
interface BoardListProps {
	org: string;
	query: {
		search?: string;
		favourite?: string;
	};
}
export const BoardList = ({ org, query }: BoardListProps) => {
	const data = [];

	if (!data.length && query.search) {
		return <EmptySearch />;
	}

	if (!data.length && query.favourite) {
		return <EmptyFaourites />;
	}

	if (!data.length) {
		return <EmptyBoards />;
	}

	return <div>{JSON.stringify(query)}</div>;
};
