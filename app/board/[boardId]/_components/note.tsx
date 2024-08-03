import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { Kalam, Poppins } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
const font = Poppins({
	subsets: ["latin"],
	weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
	const maxFontSize = 96;
	const scaleFactor = 0.15;
	const fontSizeHeight = height * scaleFactor;
	const fontSizeWidth = width * scaleFactor;

	return Math.min(fontSizeHeight, fontSizeWidth, maxFontSize);
};

interface NoteProps {
	id: string;
	layer: NoteLayer;
	onPointerDown: (e: React.PointerEvent, id: string) => void;
	selectionColor?: string;
}

export const Note = ({
	id,
	layer,
	onPointerDown,
	selectionColor,
}: NoteProps) => {
	const { x, y, width, fill, height, value } = layer;

	const updateValue = useMutation(({ storage }, newValue: string) => {
		const liveLayers = storage.get("layers");

		liveLayers.get(id)?.set("value", newValue);
	}, []);
	const handleContentChange = (e: ContentEditableEvent) => {
		updateValue(e.target.value);
	};

	return (
		<foreignObject
			x={x}
			y={y}
			width={width}
			height={height}
			onPointerDown={(e) => onPointerDown(e, id)}
			style={{
				outline: selectionColor ? `1px solid ${selectionColor}` : "none",
				backgroundColor: fill ? colorToCss(fill) : "#000",
			}}
			className="shadow-md drop-shadow-xl p-3 rounded-md"
		>
			📌
			<ContentEditable
				html={value || "Text"}
				onChange={handleContentChange}
				className={cn(
					"h-full w-[100%] flex outline-none text-wrap",
					font.className
				)}
				style={{
					fontSize: calculateFontSize(width, height),
					color: fill ? getContrastingTextColor(fill) : "#FAFFAF",
				}}
			/>
		</foreignObject>
	);
};
