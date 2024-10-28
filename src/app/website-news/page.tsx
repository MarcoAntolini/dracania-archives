"use client";

import news from "@/data/news";
import { useState } from "react";

export default function Changelog() {
	const newsForLoad = 10;
	const [displayCount, setDisplayCount] = useState(newsForLoad);
	const totalNews = news.length;

	return (
		<div className="max-w-full px-6 py-10 md:max-w-screen-xl md:px-10">
			<h1 className="mb-2 px-3 text-2xl text-custom-main">Changelog</h1>
			<ol className="relative border-s border-custom-main">
				{news.slice(0, displayCount).map((n, _) => (
					<li key={_} className="ms-4 mt-10 overflow-hidden">
						<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-900 bg-custom-main"></div>
						<time className="mb-1 text-sm font-normal leading-none text-custom-muted">{n.date}</time>
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
					className="mt-4 rounded bg-custom-main px-4 py-2 text-gray-100 transition-all duration-200 ease-in-out hover:bg-custom-main-darker hover:text-white"
					onClick={() => setDisplayCount((prevCount) => prevCount + newsForLoad)}
				>
					Load More
				</button>
			)}
		</div>
	);
}
