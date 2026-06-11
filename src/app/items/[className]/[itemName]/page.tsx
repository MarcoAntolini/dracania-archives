"use client";

import EquipItem from "@/components/game/item";
import { api } from "@/convex/_generated/api";
import { availableClasses } from "@/types/common/classes";
import type { Item } from "@/types/items";
import { useQuery } from "convex/react";
import { StaticImage as Image } from "@/components/ui/static-image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Page({ params }: { params: { className: string; itemName: string } }) {
	const router = useRouter();

	const className = availableClasses.find((c) => c.commonName === params.className)?.name;
	const itemName = params.itemName.replaceAll("%20", " ");

	const queryItem = useQuery(
		api.queries.items.getApprovedItemByName,
		className ? { class: className, name: itemName } : "skip",
	);

	const [item, setItem] = useState<Item | null>(null);
	const isLoading = queryItem === undefined;

	useEffect(() => {
		if (queryItem !== undefined && queryItem === null) {
			router.replace("/404");
		} else if (queryItem) {
			const { _id, _creationTime, approved, contributorUsername, ...newItem } = queryItem;
			setItem(newItem as Item);
		}
	}, [queryItem, router]);

	return (
		<div className="flex flex-col items-center gap-6 p-5 md:p-10">
			{isLoading ? (
				<ClipLoader className="mt-10 h-10 w-10" color="#cdb485" />
			) : (
				<>
					<div className="flex flex-col items-center gap-4 md:flex-row">
						<Image src={`/images/classes/${params.className}_logo.png`} alt="class" width={60} height={60} />
						<span className="text-2xl">{item?.name}</span>
					</div>
					<EquipItem item={item as Item} />
				</>
			)}
		</div>
	);
}
