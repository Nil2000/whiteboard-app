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

export const Toolbar = () => {
	return (
		<div className="absolute top-16 left-2 flex flex-col gap-y-4 rounded-md">
			<div className="bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md">
				<ToolButton
					icon={MousePointer2}
					onClick={() => {}}
					label="Select"
					isActive={false}
				/>
				<ToolButton
					icon={Type}
					onClick={() => {}}
					label="Text"
					isActive={false}
				/>
				<ToolButton
					icon={StickyNote}
					onClick={() => {}}
					label="Sticky note"
					isActive={false}
				/>
				<ToolButton
					icon={Square}
					onClick={() => {}}
					label="Rectangle"
					isActive={false}
				/>
				<ToolButton
					icon={Circle}
					onClick={() => {}}
					label="Ellipse"
					isActive={false}
				/>
				<ToolButton
					icon={Pencil}
					onClick={() => {}}
					label="Draw"
					isActive={false}
				/>
			</div>
			<div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
				<ToolButton
					icon={Undo}
					onClick={() => {}}
					label="Undo"
					isActive={false}
					isDisabled={true}
				/>
				<ToolButton
					icon={Redo}
					onClick={() => {}}
					label="Redo"
					isActive={false}
					isDisabled={true}
				/>
			</div>
		</div>
	);
};
export const ToolbarSkeleton = () => {
	return (
		<div className="absolute top-[50%] left-2 flex flex-col gap-y-4 -translate-y-[50%] h-[360px] bg-white w-[52px] shadow-md rounded-md"></div>
	);
};
