import LeftArrow from "./arrowsSvg/LeftArrow";
import RightArrow from "./arrowsSvg/RightArrow";

export default function DataPagination({
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

	const isNextDisabled = currentPage === pages || pages === 0;
	const isPrevDisabled = currentPage === 1 || pages === 0;

	return (
		<nav aria-label="page navigation" className="mt-6 flex flex-col gap-2">
			<ul className="flex h-8 items-center justify-center -space-x-px text-sm">
				<li>
					<button
						className={`disabled-arrow me-0 rounded-s-lg border-e-0 ${
							isPrevDisabled ? "opacity-50" : "hover:bg-light hover:text-white"
						}`}
						onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
						disabled={isPrevDisabled}
					>
						<LeftArrow />
						<span className="ml-1">Prev</span>
					</button>
				</li>
				<li>
					<button
						className={`disabled-arrow ms-0 rounded-e-lg border-s-0 ${
							isNextDisabled ? "opacity-50" : "hover:bg-light hover:text-white"
						}`}
						onClick={() => setCurrentPage((prev) => Math.min(pages, prev + 1))}
						disabled={isNextDisabled}
					>
						<span className="mr-1">Next</span>
						<RightArrow />
					</button>
				</li>
			</ul>
			<div className="flex justify-center text-xs text-gray-400" style={{}}>
				Showing <span className="text-main mx-1">{items === 0 ? 0 : itemsPerPage * (currentPage - 1) + 1}</span>
				to <span className="text-main mx-1">{Math.min(itemsPerPage * currentPage, items)}</span>
				of <span className="text-main mx-1">{items}</span>
				items
			</div>
		</nav>
	);
}
