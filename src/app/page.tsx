"use client";

import Separator from "@/components/Separator";
import Image from "next/image";
import Link from "next/link";
import ActiveCodes from "./_components/codes/ActiveCodes";
import news from "./changelog/news";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center">
			<Image
				src="/images/game/banner.jpg"
				alt="banner"
				width={100}
				height={100}
				sizes="100vw"
				className="mx-auto min-w-full"
			/>
			<Separator color="#cdb485" />
			<h1 className="text-4xl md:text-5xl text-main-color text-center my-6 mx-4">Welcome to Dracania Archives</h1>
			<div className="flex flex-col lg:flex-row justify-center items-center w-full mb-4 gap-4 md:gap-10 lg:gap-16">
				<News />
				<ActiveCodes />
			</div>
		</div>
	);
}

function News() {
	return (
		<div className="lg:w-[50%] max-w-[90%] border border-main-color rounded-lg p-5 pb-7">
			<h2 className="text-2xl font-semibold text-main-color">News</h2>
			<ol className="relative border-s border-main-color">
				{news.slice(0, 3).map((n, idx) => (
					<li key={idx} className="my-5 ms-4 overflow-hidden">
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
			<Link
				href="/changelog"
				className="ml-auto mt-4 bg-main-color text-gray-100 px-4 py-2 rounded hover:bg-[#c4a770] hover:text-white transition-all duration-200 ease-in-out"
			>
				Read all
			</Link>
		</div>
	);
}
