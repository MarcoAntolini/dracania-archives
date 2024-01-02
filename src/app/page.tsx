"use client";

import Separator from "@/components/Separator";
import Image from "next/image";
import Link from "next/link";
import news from "@/data/news";
import ActiveCodes from "./_components/codes/ActiveCodes";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center">
			<Image
				src="/images/game/banner.jpg"
				alt="banner"
				width={100}
				height={100}
				sizes="100vw"
				className="mx-auto min-w-full"
			/>
			<Separator color="#cdb485" />
			<h1 className="text-main mx-4 my-6 text-center text-4xl md:text-5xl">Welcome to Dracania Archives</h1>
			<div className="mb-4 flex w-full flex-col items-center justify-center gap-4 md:gap-10 lg:flex-row lg:gap-16">
				<News />
				<ActiveCodes />
			</div>
		</div>
	);
}

function News() {
	return (
		<div className="border-main max-w-[90%] rounded-lg border p-5 pb-7 lg:w-[50%]">
			<h2 className="text-main text-2xl font-semibold">News</h2>
			<ol className="border-main relative border-s">
				{news.slice(0, 3).map((n, idx) => (
					<li key={idx} className="my-5 ms-4 overflow-hidden">
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
			<Link
				href="/changelog"
				className="bg-main ml-auto mt-4 rounded px-4 py-2 text-gray-100 transition-all duration-200 ease-in-out hover:bg-[#c4a770] hover:text-white"
			>
				Read all
			</Link>
		</div>
	);
}
