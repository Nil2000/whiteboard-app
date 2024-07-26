"use client";

import { ReactNode } from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
	children: ReactNode;
	roomId: string;
	fallback: ReactNode;
}

export function Room({ children, roomId, fallback }: RoomProps) {
	return (
		<LiveblocksProvider
			publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCK_API_KEY!}
		>
			<RoomProvider id={roomId}>
				<ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
