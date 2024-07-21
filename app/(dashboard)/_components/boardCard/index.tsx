import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
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

	return (
		<Link href={`/board/${id}`}>
			<div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden ">
				<div className="relative flex-1 bg-amber-50">
					<Image src={imageUrl} alt={title} fill className="object-contain" />
					<Overlay />
				</div>
				<Footer
					title={title}
					authorLabel={authLabel}
					createdAtLabel={createdAtLabel}
					isFavourite={isFavourite}
					onClick={() => {}}
					disabled={false}
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
