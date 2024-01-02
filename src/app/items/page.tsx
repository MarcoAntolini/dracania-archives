"use client";

import { type Class } from "dso-database";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { availableClasses } from "@/types/classes";

export default function Items() {
	const [selectedClass, setSelectedClass] = useState<Class>();

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="mb-1 mt-6 text-2xl">Select class:</h1>
			<div className="grid grid-cols-1 md:grid-cols-2">
				{availableClasses.map((c) => (
					<Link
						key={c.name}
						href={`/items/${c.commonName}`}
						onClick={() => setSelectedClass(c.name)}
						className="m-4 flex flex-col justify-center rounded-xl border border-[#cdb485a2] bg-neutral-950 p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-xl"
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
						<Image src="/images/items/item-separator.png" alt="separator" width={300} height={50} className="m-2" />
						<div className="flex items-center justify-between">
							<p className="ml-4 text-center text-xl">{c.name}</p>
							<Image
								src={`/images/classes/${c.commonName}_logo.png`}
								alt={`${c.name}-logo`}
								width={50}
								height={50}
								className="mr-4"
							/>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
