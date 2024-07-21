"use client";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { cn } from "@/lib/utils";
import { PlusSquare } from "lucide-react";

interface NewBoardButtonProps {
	orgId: string;
	disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
	const { mutate, pending } = useApiMutation(api.board.create);

	const onClick = () => {
		mutate({ orgId, title: "Untitled Board" })
			.then((id) => {
				toast.success("Board created successfully");
			})
			.catch((err) => {
				toast.error("Failed to create board");
			});
	};

	return (
		<button
			disabled={pending || disabled}
			onClick={onClick}
			className={cn(
				"col-span-1 aspect-[100/127] bg-blue-500 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
				(pending || disabled) && "opacity-75 hover:bg-blue-500"
			)}
		>
			<PlusSquare className="h-12 w-12 text-white stroke-1" />
			<p className="text-white font-light">New Board</p>
		</button>
	);
};
