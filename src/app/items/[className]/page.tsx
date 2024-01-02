"use client";

import DataPagination from "@/components/DataPagination";
import { availableClasses } from "@/types/classes";
import { useWindowSize } from "@/utils/hooks";
import type { Item } from "dso-database";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import FilterForm from "./_components/FilterForm";

export default function Page({ params }: { params: { className: string } }) {
	const selectedClass = availableClasses.find((c) => c.commonName.toLowerCase() === params.className)?.name;
	if (!selectedClass) {
		throw notFound();
	}

	const [items, setItems] = useState<Item[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(1);
	const [gridCols, setGridCols] = useState(1);
	const rows = 5;
	const windowSize = useWindowSize();
	const outerPadding = 20;
	const itemWidth = 128;
	const itemsGap = 8;

	useEffect(() => {
		const updateItemsPerPage = () => {
			const containerWidth = windowSize.width || 1;
			const availableWidth = containerWidth - outerPadding * 2 + itemsGap;
			const itemWidthWithGap = itemWidth + itemsGap;
			const calculatedItemsPerPage = Math.floor(availableWidth / itemWidthWithGap) * rows;
			setItemsPerPage(Math.max(calculatedItemsPerPage, 1));
			setGridCols(Math.floor(availableWidth / itemWidthWithGap));
		};
		updateItemsPerPage();
		window.addEventListener("resize", updateItemsPerPage);
		return () => {
			window.removeEventListener("resize", updateItemsPerPage);
		};
	}, [windowSize.width]);

	// TODO rimuovere testIdx da sotto
	const testItems = [
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
		...items,
	];

	return (
		<div className="item-section p-5 pb-2">
			<FilterForm selectedClass={selectedClass} setItems={setItems} setCurrentPage={setCurrentPage} />
			<div className="mt-6">
				<div
					className="mx-auto grid w-fit gap-2"
					style={{
						gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
					}}
				>
					{testItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, testIdx) => (
						<Link
							href={`/items/${params.className}/${item.name}`}
							key={testIdx}
							className="cursor-pointer overflow-hidden"
							style={{
								backgroundImage: `url(https://api.dracania-archives.com/images/${item.image}.png)`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								width: `${itemWidth}px`,
								height: `${itemWidth}px`,
							}}
						>
							<span
								className={`flex h-full w-full flex-wrap content-center justify-center overflow-hidden bg-[#00000077] p-2 text-center text-sm opacity-0 transition-opacity hover:opacity-100 max-h-[${itemWidth}px] max-w-[${itemWidth}px]`}
							>
								{item.name}
							</span>
						</Link>
					))}
				</div>
				<DataPagination
					items={testItems.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
}
