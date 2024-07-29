import { RectangleLayer } from "@/types/canvas";
import React from "react";

interface RectangleProps {
	layerId: string;
	layer: RectangleLayer;
	onPointerDown: (e: React.PointerEvent, layerId: string) => void;
	selectionColor?: string;
}

export default function Rectangle({
	layerId,
	layer,
	onPointerDown,
	selectionColor,
}: RectangleProps) {
	const { x, y, width, height, fill } = layer;
	return (
		<rect
			onPointerDown={(e) => onPointerDown(e, layerId)}
			className="drop-shadow-md"
			x={0}
			y={0}
			width={width}
			height={height}
			style={{ transform: `translate(${x}px,${y}px)` }}
			fill="#000"
			strokeWidth={1}
			stroke={"transparent"}
		/>
	);
}
