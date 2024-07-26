import React from "react";
import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { CanvasLoading } from "./_components/canvas-loading";
interface BoardIdpageProps {
	params: {
		boardId: string;
	};
}
export default function BoardIdpage({ params }: BoardIdpageProps) {
	return (
		<Room roomId={params.boardId} fallback={<CanvasLoading />}>
			<Canvas boardId={params.boardId} />;
		</Room>
	);
}
