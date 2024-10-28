"use client";

import CustomSeparator from "@/components/game/custom-separator";
import { Progress } from "@/components/ui/progress";
import { api } from "@/convex/_generated/api";
import { availableClasses } from "@/types/common/classes";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

export default function AddItemsPage() {
	const totalItems = useQuery(api.queries.images.getTotalItems)?.length ?? 0;
	const missingItems = useQuery(api.queries.images.getAllMissingItems)?.length ?? 0;
	const addedItems = totalItems - missingItems;

	return (
		<div className="flex max-w-full flex-col items-center px-6 py-10 text-center text-gray-400 md:px-10">
			<h1 className="mb-10 flex items-center justify-center gap-2 text-4xl font-bold text-custom-main">
				Welcome to the contribute page!
			</h1>
			<p className="">
				Your input plays a crucial role 🛠️ in helping us complete the database that will help every player find all the
				data they need about any item.
			</p>
			<p className="mt-6 font-semibold text-white">
				🤫 Little spoiler:{" "}
				<span className="font-normal text-gray-400">
					a <span className="font-semibold italic">build calculator tool</span> is already being developed... and the
					items we add will be used in it!
				</span>
			</p>
			<p className="mt-6">
				By helping us submit items, you&apos;re not only contributing to the database, but also to the community!{" "}
				<span className="font-semibold text-white">
					And you&apos;ll be credited in the{" "}
					<Link
						href="/about"
						className="font-semibold text-custom-main underline transition-all hover:text-custom-main/80"
					>
						contributors section
					</Link>
					. 💖
				</span>
			</p>
			<p className="mt-6">Thank you for being part of this project! 🙏</p>
			{totalItems && missingItems ? (
				<div className="mt-10 flex w-full flex-col items-center gap-4 text-center">
					<Progress
						value={(addedItems / totalItems) * 100}
						className="w-[90%] max-w-[1200px] [&>*]:bg-custom-main"
						max={100}
					/>
					<p className="text-xl font-bold">
						Missing {missingItems} items out of {totalItems} 🗃️
					</p>
					<p className="text-lg font-semibold">
						Items already added:{" "}
						<span className="font-semibold text-white">{((addedItems / totalItems) * 100).toFixed(2)}%</span>
					</p>
				</div>
			) : (
				<MoonLoader color="#cdb485" className="mt-10" />
			)}
			<CustomSeparator type="main" className="my-10 max-w-[1400px]" />
			<div className="flex flex-col items-center gap-4">
				<h2 className="text-2xl font-semibold text-custom-main">Select the class</h2>
				<div className="grid grid-cols-1 md:grid-cols-2">
					{availableClasses.map((c) => (
						<Link
							key={c.name}
							href={`/add-items/${c.commonName}`}
							className="m-4 flex flex-col justify-center rounded-xl border border-custom-main border-opacity-50 bg-neutral-950 p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-xl"
						>
							<div className="flex h-[265px] flex-col justify-end">
								<Image
									src={`/images/classes/${c.commonName}.png`}
									alt={c.name}
									width={300}
									height={300}
									className="mx-auto object-contain"
								/>
							</div>
							<Image src="/images/ui/item-separator.png" alt="separator" width={300} height={50} className="m-2" />
							<div className="flex items-center justify-between">
								<p className="ml-4 text-center text-xl text-white">{c.name}</p>
								<Image
									src={`/images/classes/${c.commonName}_logo.png`}
									alt={`${c.commonName}-logo`}
									width={50}
									height={50}
									className="mr-4"
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
