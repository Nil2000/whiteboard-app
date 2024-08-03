import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface EllipseProps {
	layerId: string;
	layer: EllipseLayer;
	onPointerDown: (e: React.PointerEvent, layerId: string) => void;
	selectionColor?: string;
}
export const Ellipse = ({
	layerId,
	layer,
	onPointerDown,
	selectionColor,
}: EllipseProps) => {
	return (
		<ellipse
			className="drop-shadow-md"
			onPointerDown={(e) => onPointerDown(e, layerId)}
			style={{
				transform: `translate(${layer.x}px, ${layer.y}px)`,
			}}
			rx={layer.width / 2}
			ry={layer.height / 2}
			cx={layer.width / 2}
			cy={layer.height / 2}
			fill={layer.fill ? colorToCss(layer.fill) : "#000"}
			stroke={selectionColor || "transparent"}
			strokeWidth={2}
		/>
	);
};
