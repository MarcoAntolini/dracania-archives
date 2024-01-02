import { useEffect, useState } from "react";

export const useMouseFocus = () => {
	useEffect(() => {
		const handleMouseDown = () => {
			document.body.classList.add("mouse-focus");
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Tab") {
				document.body.classList.remove("mouse-focus");
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handleMouseDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);
};

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return windowSize;
};
