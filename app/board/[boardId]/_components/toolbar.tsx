import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";
import {
	Circle,
	MousePointer2,
	Pencil,
	Redo,
	Square,
	StickyNote,
	Type,
	Undo,
} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { set } from "date-fns";

interface ToolbarProps {
	canvasState: CanvasState;
	setCanvasState: (state: CanvasState) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

export const Toolbar = ({
	canvasState,
	setCanvasState,
	undo,
	redo,
	canUndo,
	canRedo,
}: ToolbarProps) => {
	return (
		<div className="absolute top-16 left-2 flex flex-col gap-y-4 rounded-md">
			<div className="bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md">
				<ToolButton
					icon={MousePointer2}
					onClick={() => setCanvasState({ mode: CanvasMode.None })}
					label="Select"
					isActive={
						canvasState.mode === CanvasMode.None ||
						canvasState.mode === CanvasMode.SelectionNet ||
						canvasState.mode === CanvasMode.Translating ||
						canvasState.mode === CanvasMode.Resizing ||
						canvasState.mode === CanvasMode.Pressing
					}
				/>
				<ToolButton
					icon={Type}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Text,
						})
					}
					label="Text"
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Text
					}
				/>
				<ToolButton
					icon={StickyNote}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Note,
						})
					}
					label="Sticky note"
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Note
					}
				/>
				<ToolButton
					icon={Square}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Rectangle,
						})
					}
					label="Rectangle"
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Rectangle
					}
				/>
				<ToolButton
					icon={Circle}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Inserting,
							layerType: LayerType.Ellipse,
						})
					}
					label="Ellipse"
					isActive={
						canvasState.mode === CanvasMode.Inserting &&
						canvasState.layerType === LayerType.Ellipse
					}
				/>
				<ToolButton
					icon={Pencil}
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.Pencil,
						})
					}
					label="Draw"
					isActive={canvasState.mode === CanvasMode.Pencil}
				/>
			</div>
			<div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
				<ToolButton
					icon={Undo}
					onClick={undo}
					label="Undo"
					isDisabled={!canUndo}
				/>
				<ToolButton
					icon={Redo}
					onClick={redo}
					label="Redo"
					isDisabled={!canRedo}
				/>
			</div>
		</div>
	);
};
export const ToolbarSkeleton = () => {
	return (
		<div className="absolute top-16 left-2 flex flex-col gap-y-4  h-[360px] bg-white w-[52px] shadow-md rounded-md"></div>
	);
};
