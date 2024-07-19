"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import qs from "query-string";
import { ChangeEvent, useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
export const SearchInput = () => {
	const router = useRouter();
	const [value, setValue] = useState("");
	const [debouncedSearch, setSearch] = useDebounceValue(value, 500);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	useEffect(() => {
		const url = qs.stringifyUrl(
			{
				url: "/",
				query: {
					search: debouncedSearch,
				},
			},
			{ skipEmptyString: true, skipNull: true }
		);
		router.push(url);
	}, [debouncedSearch, router]);

	return (
		<div className="w-full relative">
			<Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
			<Input
				className="w-full max-w-[516px] pl-9"
				placeholder="Search boards"
				onChange={handleChange}
			/>
		</div>
	);
};