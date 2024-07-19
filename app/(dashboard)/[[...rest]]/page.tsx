"use client";
import { useOrganization } from "@clerk/nextjs";

import { EmptyBox } from "../_components/empty-org";
import { BoardList } from "../_components/board-list";

interface DashboardPageProps {
	searchParams: {
		search?: string;
		favourite?: string;
	};
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
	const { organization } = useOrganization();
	return (
		<div className="flex-1 h-[calc(100%-85px)] p-6">
			{!organization ? (
				<EmptyBox />
			) : (
				<BoardList org={organization.id} query={searchParams} />
			)}
		</div>
	);
}
