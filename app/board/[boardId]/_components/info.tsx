import { Skeleton } from "@/components/ui/skeleton";

export const Info = () => {
	return (
		<div className="absolute top-2 left-2 shadow-md px-1.5 h-12 flex items-center bg-white rounded-md">
			TODO: Information about the board
		</div>
	);
};

Info.Skeleton = () => {
	return (
		<div className="absolute top-2 left-2 shadow-md px-1.5 h-12 flex items-center bg-white rounded-md w-[300px]"></div>
	);
};
