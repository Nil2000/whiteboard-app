import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export const EmptyBoards = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Image src="/note.svg" alt="Empty search" width={140} height={140} />
			<h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
			<p className="text-muted-foreground text-sm mt-2">
				Start by creating your first board to get started
			</p>
			<div className="mt-6">
				<Button className="btn-primary mt-6" variant={"outline"}>
					<Plus className="mr-2 h-4 w-4" />
					Create Board
				</Button>
			</div>
		</div>
	);
};
