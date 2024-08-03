import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";

interface PathProps {
	x: number;
	y: number;
	points: number[][];
	fill: string;
	onPointerDown?: (e: React.PointerEvent) => void;
	stroke?: string;
}
export const Path = ({
	x,
	y,
	points,
	fill,
	onPointerDown,
	stroke,
}: PathProps) => {
	const d = points
		.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
		.join(" ");
	return (
		<path
			onPointerDown={onPointerDown}
			d={getSvgPathFromStroke(
				getStroke(points, {
					size: 16,
					thinning: 0.5,
					smoothing: 0.5,
					streamline: 0.5,
				})
			)}
			style={{
				transform: `translate(${x}px, ${y}px)`,
			}}
			x={0}
			y={0}
			fill={fill}
			stroke={stroke}
			strokeWidth={1}
			className="drop-shadow-md"
		/>
	);
};