"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";

export const EmptyBoards = () => {
	const { organization } = useOrganization();
	const { mutate, pending } = useApiMutation(api.board.createBoard);

	const onClick = () => {
		if (!organization) {
			return;
		}
		mutate({
			orgId: organization.id,
			title: "Untitled Board",
		})
			.then((id) => {
				toast.success("Board created successfully");
				//TODO: Redirect to the board
			})
			.catch((err) => {
				toast.error("Failed to create board");
			});
	};
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Image src="/note.svg" alt="Empty search" width={140} height={140} />
			<h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
			<p className="text-muted-foreground text-sm mt-2">
				Start by creating your first board to get started
			</p>
			<div className="mt-6">
				<Button
					className="btn-primary mt-6"
					variant={"outline"}
					onClick={onClick}
					disabled={pending}
				>
					<Plus className="mr-2 h-4 w-4" />
					Create Board
				</Button>
			</div>
		</div>
	);
};
