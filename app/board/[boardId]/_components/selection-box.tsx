"use client";

import { useSelectionBounds } from "@/hooks/useSelectionBounds";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
interface SelectionBoxProps {
	onResizeHandlePointerDown: (corner: Side, initialBOunds: XYWH) => void;
}
const HANDLE_WIDTH = 8;
export const SelectionBox = memo(
	({ onResizeHandlePointerDown }: SelectionBoxProps) => {
		const soleLayerId = useSelf((me) =>
			me.presence.selection.length === 1 ? me.presence.selection[0] : null
		);
		const isShowingHandles = useStorage(
			(root) =>
				soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
		);

		const bounds = useSelectionBounds();
		if (!bounds) return null;

		return (
			<>
				<rect
					className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
					style={{
						transform: `translate(${bounds.x}px, ${bounds.y}px)`,
					}}
					x={0}
					y={0}
					width={bounds.width}
					height={bounds.height}
				/>
				{isShowingHandles && (
					<>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "nwse-resize",
								transform: `translate(${bounds.x}px, ${bounds.y}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "ns-resize",
								transform: `translate(${
									bounds.x + bounds.width / 2
								}px, ${bounds.y}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Top, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "nesw-resize",
								transform: `translate(${
									bounds.x + bounds.width
								}px, ${bounds.y}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "ew-resize",
								width: `${HANDLE_WIDTH}px`,
								height: `${HANDLE_WIDTH}px`,
								transform: `translate(${
									bounds.x + bounds.width
								}px, ${bounds.y + bounds.height / 2}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Right, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "nwse-resize",
								transform: `translate(${
									bounds.x + bounds.width
								}px, ${bounds.y + bounds.height}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "ns-resize",
								transform: `translate(${
									bounds.x + bounds.width / 2
								}px, ${bounds.y + bounds.height}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Bottom, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "nesw-resize",
								transform: `translate(${
									bounds.x
								}px, ${bounds.y + bounds.height}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
						<circle
							className="fill-white stroke-1 stroke-blue-500"
							style={{
								cursor: "ew-resize",
								transform: `translate(${
									bounds.x
								}px, ${bounds.y + bounds.height / 2}px)`,
							}}
							onPointerDown={(e) => {
								e.stopPropagation();
								onResizeHandlePointerDown(Side.Left, bounds);
							}}
							r={HANDLE_WIDTH / 2}
						/>
					</>
				)}
			</>
		);
	}
);
SelectionBox.displayName = "SelectionBox";
