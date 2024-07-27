"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";
const MaxShownUser = 2;
export const Participants = () => {
	const users = useOthers();
	const self = useSelf();
	const hasMoreUsers = users.length > MaxShownUser;
	return (
		<div className="absolute top-2 right-2 shadow-md p-3 h-12 flex items-center bg-white rounded-md">
			<div className="flex gap-x-2">
				{users.slice(0, MaxShownUser).map(({ connectionId, info }) => {
					return (
						<UserAvatar
							borderColor={connectionIdToColor(connectionId)}
							key={connectionId}
							src={info?.picture}
							name={info?.name}
							fallback={info?.name?.[0] || "T"}
						/>
					);
				})}
				{self && (
					<UserAvatar
						borderColor={connectionIdToColor(self.connectionId)}
						src={self.info?.picture}
						name={`${self.info?.name} (You)`}
						fallback={self.info?.name?.[0]}
					/>
				)}
				{hasMoreUsers && (
					<UserAvatar
						name={`${users.length - MaxShownUser} more`}
						fallback={`+${users.length - MaxShownUser}`}
					/>
				)}
			</div>
		</div>
	);
};
export const ParticipantsSkeleteon = () => {
	return (
		<div className="absolute top-2 right-2 shadow-md p-3 h-12 flex items-center bg-white rounded-md w-[100px]"></div>
	);
};
