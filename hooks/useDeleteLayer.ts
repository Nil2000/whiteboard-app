import { useMutation, useSelf } from "@liveblocks/react/suspense";
import React from "react";

export const useDeleteLayer = () => {
	const selection = useSelf((self) => self.presence.selection);

	return useMutation(
		({ storage, setMyPresence }) => {
			const layer = storage.get("layers");
			const layerIds = storage.get("layerIds");

			for (const id of selection) {
				layer.delete(id);

				const index = layerIds.indexOf(id);
				if (index !== -1) {
					layerIds.delete(index);
				}
			}
			setMyPresence({ selection: [] }, { addToHistory: true });
		},
		[selection]
	);
};
