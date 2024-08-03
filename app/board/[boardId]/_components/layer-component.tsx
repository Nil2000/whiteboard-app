import { CanvasMode, LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Rectangle from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

interface LayerComponentProps {
	layerId: string;
	mode: CanvasMode;
	onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
	selectionColor?: string;
}
export const LayerComponent = memo(
	({
		layerId,
		mode,
		onLayerPointerDown,
		selectionColor,
	}: LayerComponentProps) => {
		const layer = useStorage((root) => root.layers.get(layerId));
		if (!layer) {
			return null;
		}
		switch (layer.type) {
			case LayerType.Path:
				return (
					<Path
						key={layerId}
						x={layer.x}
						y={layer.y}
						points={layer.points}
						fill={layer.fill ? colorToCss(layer.fill) : "#000"}
						stroke={selectionColor}
						onPointerDown={(e) => onLayerPointerDown(e, layerId)}
					/>
				);
			case LayerType.Note:
				return (
					<Note
						id={layerId}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				);
			case LayerType.Text:
				return (
					<Text
						id={layerId}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				);
			case LayerType.Ellipse:
				return (
					<Ellipse
						layerId={layerId}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				);
			case LayerType.Rectangle:
				return (
					<Rectangle
						layerId={layerId}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				);
			default:
				console.warn("Unknown layer type");
				return null;
		}
	}
);

LayerComponent.displayName = "LayerComponent";
