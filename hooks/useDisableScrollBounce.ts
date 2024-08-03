import { useEffect } from "react";

export default function useDisableScrollBounce() {
	useEffect(() => {
		// Disable scroll bounce on window to make the panning work properly
		document.body.classList.add("overflow-hidden", "overscroll-none");
		return () => {
			document.body.classList.remove("overflow-hidden", "overscroll-none");
		};
	}, []);
}
