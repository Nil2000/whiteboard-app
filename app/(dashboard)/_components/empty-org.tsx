import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export const EmptyBox = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Image src="/empty-box.svg" alt="Empty box" width={200} height={200} />
			<h2 className="text-2xl font-semibold mt-6">Welcome to whiteboard</h2>
			<p className="text-sm text-muted-foreground mt-2">
				Create an organization to get started
			</p>
			<div className="mt-6">
				<Dialog>
					<DialogTrigger>
						<Button size={"lg"} variant={"outline"}>
							Create organization
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-max p-0">
						<CreateOrganization />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
