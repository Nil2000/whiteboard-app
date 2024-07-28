import { Camera, Point } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = [
	"#845ec2",
	"#d65db1",
	"#ff6f91",
	"#ff9671",
	"#ffc75f",
	"#00c9a7",
	"#ff8066",
	"#b0a8b9",
	"#00d2fc",
	"#ca9fff",
	"#005b44",
	"#00c2a8",
];

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
	return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
	e: React.PointerEvent,
	camera: Camera
): Point {
	return {
		x: Math.round(e.clientX) - camera.x,
		y: Math.round(e.clientY) - camera.y,
	};
}
