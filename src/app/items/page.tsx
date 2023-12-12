"use client";

import { Classes, type Class } from "dso-database";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const classes: {
	name: Class;
	commonName: string;
}[] = [
	{
		name: Classes.steamMechanicus,
		commonName: "dwarf",
	},
	{
		name: Classes.ranger,
		commonName: "ranger",
	},
	{
		name: Classes.spellweaver,
		commonName: "mage",
	},
	{
		name: Classes.dragonknight,
		commonName: "dwarf",
	},
];

export default function Items() {
	const [selectedClass, setSelectedClass] = useState<Class>();

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-2xl mt-6 mb-1">Select class:</h1>
			<div className="grid md:grid-cols-2 grid-cols-1">
				{classes.map((c) => (
					<Link
						key={c.name}
						href={`/items/${c.commonName}`}
						onClick={() => setSelectedClass(c.name)}
						className="border-[#cdb485a2] border hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl rounded-xl p-2 m-4 bg-neutral-950 flex flex-col justify-center"
					>
						<div className="h-[265px] flex flex-col justify-end">
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
							<p className="text-center ml-4 text-xl">{c.name}</p>
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
