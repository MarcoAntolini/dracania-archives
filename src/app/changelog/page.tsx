"use client";

import { useState } from "react";
import news from "./news";

export default function Changelog() {
	const newsForLoad = 10;
	const [displayCount, setDisplayCount] = useState(newsForLoad);
	const totalNews = news.length;

	return (
		<div className="px-3 md:px-5 py-9 md:max-w-screen-xl mx-auto max-w-full">
			<h1 className="text-2xl text-main-color mb-2">Changelog</h1>
			<ol className="relative border-s border-main-color">
				{news.slice(0, displayCount).map((n, idx) => (
					<li key={idx} className="mt-10 ms-4 overflow-hidden">
						<div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-main-color"></div>
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
					className="mt-4 bg-main-color text-gray-100 px-4 py-2 rounded hover:bg-[#c4a770] hover:text-white transition-all duration-200 ease-in-out"
					onClick={() => setDisplayCount((prevCount) => prevCount + newsForLoad)}
				>
					Load More
				</button>
			)}
		</div>
	);
}
