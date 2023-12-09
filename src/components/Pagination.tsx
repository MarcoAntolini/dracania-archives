"use client";

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
	const arrowsClassname =
		"flex items-center justify-center px-3 h-8 leading-tight border bg-[#212121] border-[#212121] text-gray-400 hover:bg-[#383838] hover:text-white";

	return (
		pages > 1 && (
			<nav aria-label="Page navigation example" className="mt-6">
				<ul className="flex items-center -space-x-px h-8 text-sm">
					<li>
						<button
							className={`${arrowsClassname} ms-0 border-e-0 rounded-s-lg`}
							onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
						>
							<span className="sr-only">Previous</span>
							<svg
								className="w-2.5 h-2.5 rtl:rotate-180"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 1 1 5l4 4"
								/>
							</svg>
						</button>
					</li>
					{Array.from({ length: pages }, (_, i) => (
						<li key={i}>
							<button
								className={`flex items-center justify-center px-3 h-8 leading-tight border border-[#212121] text-gray-400 hover:bg-[#383838] hover:text-white
								${currentPage == i + 1 ? "bg-[#383838] text-white" : ""}
								`}
								onClick={() => setCurrentPage(i + 1)}
							>
								{i + 1}
							</button>
						</li>
					))}
					<li>
						<button
							className={`${arrowsClassname} rounded-e-lg`}
							onClick={() => setCurrentPage((prev) => Math.min(pages, prev + 1))}
						>
							<span className="sr-only">Next</span>
							<svg
								className="w-2.5 h-2.5 rtl:rotate-180"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						</button>
					</li>
				</ul>
			</nav>
		)
	);
}
