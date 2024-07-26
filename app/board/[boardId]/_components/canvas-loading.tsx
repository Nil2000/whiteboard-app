import { Loader } from "lucide-react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

export const CanvasLoading = () => {
	return (
		<main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
			<Loader className="h-10 w-10 text-muted-foreground animate-spin" />
			<Info.Skeleton />
			<Participants.Skeleteon />
			<Toolbar.Skeleton />
		</main>
	);
};
