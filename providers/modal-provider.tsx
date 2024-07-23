"use client";
import { RenameModal } from "@/components/modals/rename-modal";
import React, { useEffect } from "react";

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = React.useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<RenameModal />
		</>
	);
};
