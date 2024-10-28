import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

export default function Pagination({
	items,
	itemsPerPage,
	currentPage,
	setCurrentPage,
	itemsName,
}: {
	items: number;
	itemsPerPage: number;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	itemsName: string;
}) {
	const pages = Math.ceil(items / itemsPerPage);

	const isNextDisabled = currentPage === pages || pages === 0;
	const isPrevDisabled = currentPage === 1 || pages === 0;

	return (
		<nav aria-label="page navigation" className="mt-6 flex flex-col gap-2">
			<ul className="flex h-8 items-center justify-center gap-2 -space-x-px text-sm">
				<li>
					<Button
						variant="outline"
						onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
						disabled={isPrevDisabled}
					>
						<ChevronLeft />
						<span className="ml-1">Prev</span>
					</Button>
				</li>
				<li>
					<Button
						variant="outline"
						onClick={() => setCurrentPage((prev) => Math.min(pages, prev + 1))}
						disabled={isNextDisabled}
					>
						<span className="mr-1">Next</span>
						<ChevronRight />
					</Button>
				</li>
			</ul>
			<div className="flex justify-center pt-2 text-xs text-gray-400" style={{}}>
				Showing <span className="mx-1 text-custom-main">{items === 0 ? 0 : itemsPerPage * (currentPage - 1) + 1}</span>
				to <span className="mx-1 text-custom-main">{Math.min(itemsPerPage * currentPage, items)}</span>
				of <span className="mx-1 text-custom-main">{items}</span>
				{itemsName}
			</div>
		</nav>
	);
}
