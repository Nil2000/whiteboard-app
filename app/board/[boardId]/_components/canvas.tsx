"use client";
import { useHistory, useSelf } from "@liveblocks/react/suspense";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useState } from "react";
import { CanvasMode, CanvasState } from "@/types/canvas";
interface CanvasProps {
	boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	});

	const history = useHistory();

	return (
		<main className="min-h-screen w-full relative bg-neutral-100 touch-none">
			<Info boardId={boardId} />
			<Participants />
			<Toolbar
				canvasState={canvasState}
				setCanvasState={setCanvasState}
				undo={() => history.undo()}
				redo={() => history.redo()}
				canUndo={history.canUndo()}
				canRedo={history.canRedo()}
			/>
		</main>
	);
};
