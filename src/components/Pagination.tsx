"use client";

import LeftArrow from "./arrowsSvg/LeftArrow";
import RightArrow from "./arrowsSvg/RightArrow";

export default function Pagination({
	items,
	itemsPerPage,
	currentPage,
	setCurrentPage,
}: {
	items: number;
	itemsPerPage: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
	const pages = Math.ceil(items / itemsPerPage);

	return (
		pages > 1 && (
			<nav aria-label="page navigation" className="mt-6">
				<ul className="flex h-8 items-center -space-x-px text-sm">
					<li>
						<button
							className={"arrow ms-0 rounded-s-lg border-e-0"}
							onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
						>
							<span className="sr-only">Previous</span>
							<LeftArrow />
						</button>
					</li>
					{Array.from({ length: pages }, (_, i) => (
						<li key={i}>
							<button
								className={`border-dark hover:bg-light flex h-8 items-center justify-center border px-3 leading-tight text-gray-400 hover:text-white
								${currentPage == i + 1 ? "bg-light text-white" : ""}
								`}
								onClick={() => setCurrentPage(i + 1)}
							>
								{i + 1}
							</button>
						</li>
					))}
					<li>
						<button
							className={"arrow rounded-e-lg"}
							onClick={() => setCurrentPage((prev) => Math.min(pages, prev + 1))}
						>
							<span className="sr-only">Next</span>
							<RightArrow />
						</button>
					</li>
				</ul>
			</nav>
		)
	);
}
