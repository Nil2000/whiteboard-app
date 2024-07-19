import Image from "next/image";
import React from "react";

export const EmptyFaourites = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<Image
				src="/empty-favourite.svg"
				alt="Empty search"
				width={140}
				height={140}
			/>
			<h2 className="text-2xl font-semibold mt-6">No favourite boards.</h2>
			<p className="text-muted-foreground text-sm mt-2">
				Try making some boards favourite.
			</p>
		</div>
	);
};
