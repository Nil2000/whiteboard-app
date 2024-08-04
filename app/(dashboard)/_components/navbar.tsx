"use client";
import {
	OrganizationSwitcher,
	UserButton,
	useOrganization,
} from "@clerk/nextjs";
import React from "react";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
	const { organization } = useOrganization();
	return (
		<div className="flex items-center gap-x-4 p-5">
			<div className="hidden lg:flex lg:flex-1">
				<SearchInput />
			</div>
			<div className="block lg:hidden flex-1">
				<OrganizationSwitcher
					hidePersonal
					appearance={{
						elements: {
							rootBox: {
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								maxWidth: "376px",
							},
							organizationSwitcherTrigger: {
								padding: "10px",
								width: "100%",
								height: "min-content",
								borderRadius: "8px",
								border: "1px solid #E5E7EB",
								justifyContent: "space-between",
							},
							organizationPreviewAvatarBox: {
								height: "30px",
								width: "30px",
							},
							organizationPreviewMainIdentifier: {
								fontWeight: "bold",
								fontSize: "12px",
							},
							organizationSwitcherTriggerIcon: {
								height: "15px",
								width: "15px",
							},
						},
					}}
				/>
			</div>
			{organization && <InviteButton />}
			<UserButton />
		</div>
	);
};