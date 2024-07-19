import Image from "next/image";
import React from "react";

export const EmptySearch = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Image
				src="/empty-search.svg"
				alt="Empty search"
				width={140}
				height={140}
			/>
			<h2 className="text-2xl font-semibold mt-6">No results found.</h2>
			<p className="text-muted-foreground text-sm mt-2">
				Try searching for something else.
			</p>
		</div>
	);
};
