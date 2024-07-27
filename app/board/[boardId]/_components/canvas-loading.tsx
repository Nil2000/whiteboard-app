import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleteon } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export const CanvasLoading = () => {
	return (
		<main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
			<Loader className="h-10 w-10 text-muted-foreground animate-spin" />
			<InfoSkeleton />
			<ParticipantsSkeleteon />
			<ToolbarSkeleton />
		</main>
	);
};
