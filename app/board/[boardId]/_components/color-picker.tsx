"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
	onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
	return (
		<div className="flex flex-wrap items-center max-w-[155px] gap-3 mr-2 border-r border-neutral-200">
			<ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
			<ColorButton color={{ r: 255, g: 198, b: 38 }} onClick={onChange} />
			<ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
			<ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
			<ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
			<ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
			<ColorButton color={{ r: 82, g: 82, b: 82 }} onClick={onChange} />
			<ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
		</div>
	);
};

interface ColorButtonProps {
	onClick: (color: Color) => void;
	color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
	return (
		<button
			className="h-8 w-8 items-center justify-center rounded-full border border-neutral-200"
			onClick={() => onClick(color)}
		>
			<div
				className="h-8 w-8 rounded-md border border-neutral-300"
				style={{ backgroundColor: colorToCss(color) }}
			/>
		</button>
	);
};