import { CanvasMode, LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Rectangle from "./rectangle";

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