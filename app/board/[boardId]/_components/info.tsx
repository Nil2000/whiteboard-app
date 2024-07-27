"use client";
import { CardActions } from "@/components/card-actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});
const TabSeperator = () => {
	return <div className="h-6 w-[2px] bg-gray-200 mx-1"></div>;
};
interface InfoProps {
	boardId: string;
}
export const Info = ({ boardId }: InfoProps) => {
	const { onOpen } = useRenameModal();
	const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });
	if (!data) return <InfoSkeleton />;

	return (
		<div className="absolute top-2 left-2 shadow-md px-1.5 h-12 flex items-center bg-white rounded-md">
			<Hint label="Go to board" side="bottom" sideOffset={10}>
				<Button className="px-2" variant={"board"} asChild>
					<Link href="/">
						<Image src="/logo.svg" alt="logo" width={30} height={30} />
						<span
							className={cn(
								"font-semibold text-2xl ml-2 text-black",
								font.className
							)}
						>
							Board
						</span>
					</Link>
				</Button>
			</Hint>
			<TabSeperator />
			<Hint label="Rename board" sideOffset={10} side="bottom">
				<Button
					variant="board"
					className="text-base px-2"
					onClick={() => onOpen(data._id, data.title)}
				>
					{data.title}
				</Button>
			</Hint>
			<TabSeperator />
			<CardActions
				id={data._id}
				side="bottom"
				title={data.title}
				sideOffset={10}
			>
				<div>
					<Hint label="Main Menu" sideOffset={10}>
						<Button variant="board" size="icon">
							<Menu />
						</Button>
					</Hint>
				</div>
			</CardActions>
		</div>
	);
};

export const InfoSkeleton = () => {
	return (
		<div className="absolute top-2 left-2 shadow-md px-1.5 h-12 flex items-center bg-white rounded-md w-[300px]"></div>
	);
};
