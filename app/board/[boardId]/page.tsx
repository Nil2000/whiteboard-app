import React from "react";
import { Canvas } from "./_components/canvas";
interface BoardIdpageProps {
	params: {
		boardId: string;
	};
}
export default function BoardIdpage({ params }: BoardIdpageProps) {
	return <Canvas boardId={params.boardId} />;
}
