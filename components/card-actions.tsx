"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Link2, PencilLine, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";

import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { ConfirmModal } from "./confirm-modal";

interface CardActionsProps {
	children: React.ReactNode;
	title: string;
	side: DropdownMenuContentProps["side"];
	id: string;
	sideOffset?: DropdownMenuContentProps["sideOffset"];
}

export const CardActions = ({
	children,
	title,
	side,
	id,
	sideOffset,
}: CardActionsProps) => {
	const { onOpen } = useRenameModal();
	const { mutate, pending } = useApiMutation(api.board.remove);

	const handleCopyLink = () => {
		navigator.clipboard
			.writeText(`${window.location.origin}/board/${id}`)
			.then(() => toast.success("Link copied to clipboard"))
			.catch(() => toast.error("Failed to copy link"));
	};

	const handleDelete = () => {
		mutate({ id })
			.then(() => toast.success("Board deleted"))
			.catch(() => toast.error("Failed to delete board"));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent
				onClick={(e) => e.stopPropagation()}
				side={side}
				sideOffset={sideOffset}
				className="w-60"
			>
				<DropdownMenuItem
					onClick={handleCopyLink}
					className="p-3 cursor-pointer"
				>
					<Link2 className="h-4 w-4 mr-2" />
					Copy board link
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onOpen(id, title)}
					className="p-3 cursor-pointer"
				>
					<PencilLine className="h-4 w-4 mr-2" />
					Rename board
				</DropdownMenuItem>
				<ConfirmModal
					header="Delete board"
					description={`This will delete the board and all of its contents.Are you sure you want to delete "${title}"?`}
					onConfirm={handleDelete}
					disabled={pending}
				>
					<Button
						className="p-3 cursor-pointer w-full justify-start font-normal"
						variant="ghost"
					>
						<Trash2 className="h-4 w-4 mr-2" />
						Delete board
					</Button>
				</ConfirmModal>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
