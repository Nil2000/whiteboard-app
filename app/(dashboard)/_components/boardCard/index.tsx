import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";

import { MoreHorizontal } from "lucide-react";
import { CardActions } from "@/components/card-actions";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
interface BoardCardProps {
	id: string;
	title: string;
	imageUrl: string;
	authorId: string;
	authorName: string;
	createdAt: number;
	orgId: string;
	isFavourite: boolean;
}

export const BoardCard = ({
	id,
	title,
	imageUrl,
	authorId,
	authorName,
	createdAt,
	orgId,
	isFavourite,
}: BoardCardProps) => {
	const { userId } = useAuth();
	const authLabel = userId === authorId ? "You" : authorName;
	const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
	const { mutate: onFav, pending: pendingFav } = useApiMutation(
		api.board.favourite
	);
	const { mutate: onUnFav, pending: pendingUnFav } = useApiMutation(
		api.board.unfavourite
	);
	const toggleFav = () => {
		if (isFavourite) {
			onUnFav({ id }).catch(() =>
				toast.error("Failed to remove from favourites")
			);
		} else {
			onFav({ id, orgId }).catch(() =>
				toast.error("Failed to add to favourites")
			);
		}
	};

	return (
		<Link href={`/board/${id}`}>
			<div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden ">
				<div className="relative flex-1 bg-amber-50">
					<Image src={imageUrl} alt={title} fill className="object-contain" />
					<Overlay />
					<CardActions title={title} side="bottom" id={id}>
						<button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
							<MoreHorizontal className="opacity-75 hover:opacity-100 transition-opacity" />
						</button>
					</CardActions>
				</div>
				<Footer
					title={title}
					authorLabel={authLabel}
					createdAtLabel={createdAtLabel}
					isFavourite={isFavourite}
					onClick={toggleFav}
					disabled={pendingFav || pendingUnFav}
				/>
			</div>
		</Link>
	);
};

BoardCard.Skeleton = () => {
	return (
		<div className="aspect-[100/127] rounded-lg overflow-hidden">
			<Skeleton className="w-full h-full" />
		</div>
	);
};
