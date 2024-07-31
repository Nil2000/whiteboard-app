// taken ref from https://github.com/liveblocks/liveblocks/blob/main/examples/nextjs-whiteboard-advanced/src/index.tsx
"use client";
import {
	useHistory,
	useMutation,
	useOthersMapped,
	useSelf,
	useStorage,
} from "@liveblocks/react/suspense";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import React, { useCallback, useMemo, useState } from "react";
import {
	Camera,
	CanvasMode,
	CanvasState,
	Color,
	LayerType,
	Point,
} from "@/types/canvas";
import { CursorPresence } from "./cursor-presence";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerComponent } from "./layer-component";
import { set } from "date-fns";
import { SelectionBox } from "./selection-box";
const MAX_LAYERS = 100;
interface CanvasProps {
	boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
	const layerIds = useStorage((s) => s.layerIds);
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	});
	const history = useHistory();
	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
	const [lastUsedColor, setLastUsedColor] = useState<Color>({
		r: 0,
		g: 0,
		b: 244,
	});

	const insertLayer = useMutation(
		(
			{ storage, setMyPresence },
			layerType:
				| LayerType.Rectangle
				| LayerType.Ellipse
				| LayerType.Text
				| LayerType.Note,
			position: Point
		) => {
			const liveLayers = storage.get("layers");
			if (liveLayers.size >= MAX_LAYERS) {
				return;
			}
			const liveLayerIds = storage.get("layerIds");
			const layerId = nanoid();
			const layer = new LiveObject({
				type: layerType,
				x: position.x,
				y: position.y,
				height: 100,
				width: 100,
				fill: lastUsedColor,
			});
			liveLayerIds.push(layerId);
			liveLayers.set(layerId, layer);

			setMyPresence({ selection: [layerId] }, { addToHistory: true });
			setCanvasState({ mode: CanvasMode.None });
		},
		[lastUsedColor]
	);

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

	const onLayerPointerDown = useMutation(
		({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
			if (
				canvasState.mode === CanvasMode.Pencil ||
				canvasState.mode === CanvasMode.Inserting
			) {
				return;
			}
			history.pause();
			e.stopPropagation();
			const point = pointerEventToCanvasPoint(e, camera);
			if (!self.presence.selection.includes(layerId)) {
				setMyPresence({ selection: [layerId] }, { addToHistory: true });
			}
			setCanvasState({ mode: CanvasMode.Translating, current: point });
		},
		[setCanvasState, camera, history, canvasState.mode]
	);

	const onPointerUp = useMutation(
		({}, e) => {
			const point = pointerEventToCanvasPoint(e, camera);

			if (canvasState.mode === CanvasMode.Inserting) {
				insertLayer(canvasState.layerType, point);
			} else {
				setCanvasState({ mode: CanvasMode.None });
			}
			history.resume();
		},
		[camera, canvasState, insertLayer, history]
	);

	const selections = useOthersMapped((other) => other.presence.selection);

	const layerIdsToColorSelection = useMemo(() => {
		const layerIdsToColorSelection: Record<string, string> = {};

		for (const user of selections) {
			const [connectionId, selection] = user;

			for (const layerId of selection) {
				layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
			}
		}

		return layerIdsToColorSelection;
	}, [selections]);

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
				onPointerUp={onPointerUp}
			>
				<g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
					{layerIds.map((layerId) => (
						<LayerComponent
							key={layerId}
							layerId={layerId}
							mode={canvasState.mode}
							onLayerPointerDown={onLayerPointerDown}
							selectionColor={layerIdsToColorSelection[layerId]}
						/>
					))}
					<SelectionBox onResizeHandlePointerDown={() => {}} />
					<CursorPresence />
				</g>
			</svg>
		</main>
	);
};
