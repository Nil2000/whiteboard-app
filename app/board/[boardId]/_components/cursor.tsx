"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface CursorProps {
	connectionId: number;
}
export const Cursor = memo(({ connectionId }: CursorProps) => {
	const info = useOther(connectionId, (user) => user?.info);
	const cursor = useOther(connectionId, (user) => user?.presence.cursor);
	const name = info?.name || "Anonymous";

	if (!cursor) {
		return null;
	}
	const { x, y } = cursor;
	return (
		<foreignObject
			style={{
				transform: `translateX(${x}px) translateY(${y}px)`,
			}}
			height={50}
			width={name.length * 10 + 24}
			className="relative drop-shadow-md"
		>
			<MousePointer2
				className="h-5 w-5"
				style={{
					fill: connectionIdToColor(connectionId),
					color: connectionIdToColor(connectionId),
				}}
			/>
			<div
				className="absolute left-4 px-2 py-1 rounded-md text-xs text-white font-semibold"
				style={{ backgroundColor: connectionIdToColor(connectionId) }}
			>
				{name}
			</div>
		</foreignObject>
	);
});
Cursor.displayName = "Cursor";
