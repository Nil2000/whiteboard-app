"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});
export const OrgSidebar = () => {
	const searchParams = useSearchParams();
	const favourite = searchParams.get("favourite") === "true";
	return (
		<div className="hidden lg:flex flex-col space-y-6 w-[260px] pl-5 pt-5">
			<Link href="/">
				<div className="flex items-center gap-x-2">
					<Image src="/logo.svg" alt="logo" width={50} height={50} />
					<span className={cn("font-semibold text-3xl", font.className)}>
						Board
					</span>
				</div>
			</Link>
			<OrganizationSwitcher
				hidePersonal
				appearance={{
					elements: {
						rootBox: {
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
						},
						organizationSwitcherTrigger: {
							padding: "10px",
							width: "100%",
							height: "min-content",
							borderRadius: "8px",
							border: "1px solid #E5E7EB",
							justifyContent: "space-between",
						},
						organizationPreviewAvatarImage: {
							height: "40px",
							width: "40px",
						},
						organizationPreviewAvatarBox: {
							height: "40px",
							width: "40px",
						},
						organizationPreviewMainIdentifier: {
							fontWeight: "bold",
							fontSize: "15px",
						},
						organizationSwitcherTriggerIcon: {
							height: "20px",
							width: "20px",
						},
					},
				}}
			/>
			<div className="space-y-1 w-full">
				<Button
					variant={favourite ? "ghost" : "secondary"}
					asChild
					size={"lg"}
					className="font-normal justify-start px-2 w-full"
				>
					<Link href="/">
						<LayoutDashboard className="h-4 w-4 mr-2" />
						Team boards
					</Link>
				</Button>
				<Button
					variant={!favourite ? "ghost" : "secondary"}
					asChild
					size={"lg"}
					className="font-normal justify-start px-2 w-full"
				>
					<Link
						href={{
							pathname: "/",
							query: { favourite: true },
						}}
					>
						<Star className="h-4 w-4 mr-2" />
						Favourite boards
					</Link>
				</Button>
			</div>
		</div>
	);
};
