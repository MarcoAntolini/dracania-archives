"use client";

import news from "@/data/news";
import { useState } from "react";

export default function Changelog() {
	const newsForLoad = 10;
	const [displayCount, setDisplayCount] = useState(newsForLoad);
	const totalNews = news.length;

	return (
		<div className="mx-auto max-w-full px-3 py-9 md:max-w-screen-xl md:px-5">
			<h1 className="text-main mb-2 text-2xl">Changelog</h1>
			<ol className="border-main relative border-s">
				{news.slice(0, displayCount).map((n, idx) => (
					<li key={idx} className="ms-4 mt-10 overflow-hidden">
						<div className="bg-main absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-900"></div>
						<time className="mb-1 text-sm font-normal leading-none text-[#565656]">{n.date}</time>
						<h3 className="text-lg font-semibold text-white">{n.title}</h3>
						<div className="mb-4 text-base font-normal text-gray-400">
							<ul className="pl-5">
								{n.changes.map((c, i) => (
									<li key={i} className="list-disc py-1">
										{c}
									</li>
								))}
							</ul>
						</div>
					</li>
				))}
			</ol>
			{displayCount < totalNews && (
				<button
					className="bg-main mt-4 rounded px-4 py-2 text-gray-100 transition-all duration-200 ease-in-out hover:bg-[#c4a770] hover:text-white"
					onClick={() => setDisplayCount((prevCount) => prevCount + newsForLoad)}
				>
					Load More
				</button>
			)}
		</div>
	);
}
