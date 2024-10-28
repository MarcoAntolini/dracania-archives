"use client";

import CustomSeparator from "@/components/game/custom-separator";
import news from "@/data/news";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="relative flex flex-col items-center justify-center">
			<Image
				src="/images/game/banner.jpg"
				alt="banner"
				width={100}
				height={100}
				sizes="100vw"
				className="mx-auto min-w-full"
			/>
			<div className="flex w-full max-w-[1200px] flex-col items-center justify-center">
				<CustomSeparator type="main" />
				<h1 className="mx-4 my-9 text-center text-4xl text-custom-main md:text-5xl">Welcome to Dracania Archives</h1>
				<div className="mb-10 w-full max-w-[90%] rounded-lg border border-custom-main p-5 pb-7">
					<h2 className="text-2xl font-semibold text-custom-main">News</h2>
					<ol className="relative border-s border-custom-main">
						{news.slice(0, 3).map((n, _) => (
							<li key={_} className="my-5 ms-4 overflow-hidden">
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
					<Link
						href="/website-news"
						className="ml-auto mt-4 rounded bg-custom-main px-4 py-2 text-gray-100 transition-all duration-200 ease-in-out hover:bg-custom-main-darker hover:text-white"
					>
						Read all
					</Link>
				</div>
			</div>
		</div>
	);
}
