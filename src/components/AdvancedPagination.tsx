"use client";

import LeftArrow from "./arrowsSvg/LeftArrow";
import LeftDoubleArrow from "./arrowsSvg/LeftDoubleArrow";
import RightArrow from "./arrowsSvg/RightArrow";
import RightDoubleArrow from "./arrowsSvg/RightDoubleArrow";

export default function AdvancedPagination({
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

	const renderPageButtons = () => {
		const pageButtons: React.ReactNode[] = [];
		if (pages <= 7) {
			for (let i = 1; i <= pages; i++) {
				pageButtons.push(renderPageButton(i));
			}
		} else {
			if (currentPage === 3) {
				pageButtons.push(renderPageButton(1));
			}
			if (currentPage > 3) {
				pageButtons.push(renderPageButton(1));
				pageButtons.push(renderEllipsis("left"));
			}
			if (currentPage > 1) {
				pageButtons.push(renderPageButton(currentPage - 1));
			}
			pageButtons.push(renderPageButton(currentPage));
			if (currentPage < pages) {
				pageButtons.push(renderPageButton(currentPage + 1));
			}
			if (currentPage < pages - 2) {
				pageButtons.push(renderEllipsis("right"));
				pageButtons.push(renderPageButton(pages));
			}
			if (currentPage === pages - 2) {
				pageButtons.push(renderPageButton(pages));
			}
		}
		return pageButtons;
	};

	const renderPageButton = (pageNumber: number) => (
		<li key={pageNumber}>
			<button
				className={`border-dark hover:bg-light flex h-8 items-center justify-center border px-3 leading-tight text-gray-400 hover:text-white
          ${currentPage === pageNumber ? "bg-light text-white" : ""}
        `}
				onClick={() => setCurrentPage(pageNumber)}
			>
				{pageNumber}
			</button>
		</li>
	);

	const renderEllipsis = (key: string) => (
		<li key={key}>
			<span className="border-dark flex h-8 items-center justify-center border px-3 leading-tight text-gray-400">
				&hellip;
			</span>
		</li>
	);

	return (
		pages > 1 && (
			<nav aria-label="page navigation" className="mt-6 flex justify-center">
				<ul className="flex h-8 items-center -space-x-px text-sm">
					<li>
						<button className={"arrow ms-0 rounded-s-lg border-e-0"} onClick={() => setCurrentPage(1)}>
							<span className="sr-only">First</span>
							<LeftDoubleArrow />
						</button>
					</li>
					<li>
						<button className={"arrows"} onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}>
							<span className="sr-only">Previous</span>
							<LeftArrow />
						</button>
					</li>
					{renderPageButtons()}
					<li>
						<button className={"arrows"} onClick={() => setCurrentPage((prev) => Math.min(pages, prev + 1))}>
							<span className="sr-only">Next</span>
							<RightArrow />
						</button>
					</li>
					<li>
						<button className={"arrow rounded-e-lg"} onClick={() => setCurrentPage(pages)}>
							<span className="sr-only">Last</span>
							<RightDoubleArrow />
						</button>
					</li>
				</ul>
			</nav>
		)
	);
}
