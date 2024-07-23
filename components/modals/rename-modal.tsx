"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import React, { FormEventHandler, use, useEffect } from "react";
import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
	const { isOpen, onClose, initialValues } = useRenameModal();
	const { mutate, pending } = useApiMutation(api.board.update);
	const [title, setTitle] = React.useState(initialValues.title);

	useEffect(() => {
		setTitle(initialValues.title);
	}, [initialValues.title]);

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		mutate({ id: initialValues.id, title })
			.then(() => {
				toast.success("Board title updated");
				onClose();
			})
			.catch(() => toast.error("Failed to update board title"));
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit board title</DialogTitle>
				</DialogHeader>
				<DialogDescription>Enter a new title for the board</DialogDescription>
				<form onSubmit={onSubmit} className="space-y-4">
					<Input
						disabled={pending}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						maxLength={60}
						required
						placeholder="Border title"
					/>
					<DialogFooter>
						<DialogClose asChild>
							<Button onClick={onClose} variant="outline">
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" disabled={pending}>
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
