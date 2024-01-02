import { availableClasses } from "@/types/classes";
import db from "@/utils/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import EquipItem from "./_components/EquipItem";

export default async function Page({ params }: { params: { className: string; itemName: string } }) {
	const className = availableClasses.find((c) => c.commonName.toLowerCase() === params.className)?.name!;
	const itemName = params.itemName.replace("%20", " ");
	const item = (await db.items.getByName(className, itemName))[0];
	if (!item) {
		throw notFound();
	}

	return (
		<div className="flex flex-col items-center gap-6 p-5">
			<div className="mt-2 flex flex-col items-center gap-4 md:flex-row">
				<Image src={`/images/classes/${params.className}_logo.png`} alt="class" width={60} height={60} />
				<span className="text-2xl">{item.name}</span>
			</div>
			<EquipItem item={item} />
			<div>
				{/* 
					- icon
					- way to get it
					- min and max level
					- is craftable
					- is obtainable (time limited)
					- regional / event / boss / etc
				*/}
			</div>
		</div>
	);
}

// TODO:
// - le stats non sono un select ma un dropdown con radio button (o magari un select con tanti valori selezionabili?)
// - rimuovere il pulsante filter
// - un tooltip sul filter by name (e aggiungere che cerca anche nel nome del set)
