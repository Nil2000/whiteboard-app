"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
	label: string;
	icon: LucideIcon;
	onClick: () => void;
	isActive?: boolean;
	isDisabled?: boolean;
}

export const ToolButton = ({
	icon: Icon,
	onClick,
	label,
	isActive,
	isDisabled,
}: ToolButtonProps) => {
	return (
		<Hint label={label} side="right" sideOffset={14}>
			<Button
				disabled={isDisabled}
				onClick={onClick}
				variant={isActive ? "boardAction" : "board"}
				className="p-2"
			>
				<Icon />
			</Button>
		</Hint>
	);
};