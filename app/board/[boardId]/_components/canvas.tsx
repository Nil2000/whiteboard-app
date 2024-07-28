// taken ref from https://github.com/liveblocks/liveblocks/blob/main/examples/nextjs-whiteboard-advanced/src/index.tsx
"use client";
import { useHistory, useMutation, useSelf } from "@liveblocks/react/suspense";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import React, { useCallback, useState } from "react";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import { CursorPresence } from "./cursor-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
interface CanvasProps {
	boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	});
	const history = useHistory();
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

	const onWheel = useCallback((e: React.WheelEvent) => {
		// console.log("wheel", e.deltaX, e.deltaY);
		setCamera((camera) => ({
			x: camera.x - e.deltaX,
			y: camera.y - e.deltaY,
		}));
	}, []);

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault();
			const current = pointerEventToCanvasPoint(e, camera);
			// console.log("pointer move", current);
			setMyPresence({ cursor: current });
		},
		[camera]
	);

	const onPointerLeave = useMutation(({ setMyPresence }) => {
		setMyPresence({ cursor: null });
	}, []);
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
			<svg
				className="h-[100vh] w-[100vw]"
				onWheel={onWheel}
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
			>
				<g>
					<CursorPresence />
				</g>
			</svg>
		</main>
	);
};
