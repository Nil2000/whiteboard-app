import React from "react";
import { Sidebar } from "./_components/Sidebar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Navbar } from "./_components/Navbar";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="h-full">
			<Sidebar />
			<div className="pl-[60px] h-full">
				<div className="flex gap-x-3 h-full">
					<OrgSidebar />
					<div className="h-full flex-1">
						<Navbar />
						{children}
					</div>
				</div>
			</div>
		</main>
	);
}

export default DashBoardLayout;
