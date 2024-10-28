"use client";

import Pagination from "@/components/customPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { availableClasses } from "@/types/common/classes";
import { availableSlots } from "@/types/common/slots";
import { Rarities, StatTypes } from "@/types/consts";
import { type Item, type Rarity, type SetItem, type Slot, type StatType, type UniqueItem } from "@/types/items";
import { useMeasure } from "@uidotdev/usehooks";
import { useQuery } from "convex/react";
import { Filter, RefreshCcw, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Page({ params }: { params: { className: string } }) {
	const router = useRouter();

	const selectedClass = availableClasses.find((c) => c.commonName === params.className)?.name;
	if (!selectedClass) {
		router.push("/items");
	}

	const items = useQuery(api.queries.items.getApprovedItemsByClass, { class: selectedClass! });

	const [ref, { width }] = useMeasure();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(1);
	const [gridCols, setGridCols] = useState(1);
	const [padding, setPadding] = useState(0);
	const rows = 6;
	const itemWidth = 128;
	const itemsGap = 8;
	useEffect(() => {
		const availableWidth = (width || 1) + itemsGap;
		const actualItemWidth = itemWidth + itemsGap;
		const calculatedItemsPerPage = Math.floor(availableWidth / actualItemWidth) * rows;
		setItemsPerPage(calculatedItemsPerPage);
		const calculatedGridCols = Math.floor(availableWidth / actualItemWidth);
		if (items?.length && items.length < calculatedItemsPerPage) {
			setGridCols(Math.min(items.length, calculatedGridCols));
			return;
		}
		setGridCols(calculatedGridCols);
		const calculatedPadding = (availableWidth - calculatedGridCols * actualItemWidth) / 2;
		setPadding(calculatedPadding);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
	useEffect(() => {
		if (items !== undefined) {
			setIsLoading(false);
		}
	}, [items]);

	const [selectedRarity, setSelectedRarity] = useState<Rarity | undefined>(undefined);
	const [selectedSlot, setSelectedSlot] = useState<Slot | Slot[] | undefined>(undefined);
	const [selectedStats, setSelectedStats] = useState<StatType[]>([]);
	const [selectedName, setSelectedName] = useState<string>("");
	const [selectedEffect, setSelectedEffect] = useState<string>("");
	const [selectedSetName, setSelectedSetName] = useState<string>("");

	const filterRarity = (item: Item) => {
		if (!selectedRarity) return true;
		return item.rarity === selectedRarity;
	};
	const filterSlot = (item: Item) => {
		if (!selectedSlot) return true;
		if (typeof selectedSlot === "string") return item.slot === selectedSlot;
		else return selectedSlot.includes(item.slot);
	};
	const filterStats = (item: Item) => {
		if (!selectedStats || selectedStats.length === 0) return true;
		if (selectedStats.every((sStat) => item.stats.some((itemStat) => itemStat.stat === sStat))) return true;
		if (
			["Mythic Item", "Set Item"].includes(item.rarity) &&
			selectedStats.every((sStat) =>
				(item as SetItem).set?.setBonus.some(
					(setBonus) => typeof setBonus.bonus === "object" && setBonus.bonus.stat === sStat,
				),
			)
		)
			return true;
		if (
			["Mythic Item", "Set Item"].includes(item.rarity) &&
			selectedStats.every((sStat) =>
				(item as SetItem).set?.setBonus.some(
					(setBonus) => typeof setBonus.bonus === "object" && setBonus.bonus.stat === sStat,
				),
			)
		)
			return true;
		return false;
	};
	const filterName = (item: Item) => {
		if (!selectedName) return true;
		return item.name.toLowerCase().includes(selectedName.toLowerCase());
	};
	const filterEffect = (item: Item) => {
		if (!selectedEffect) return true;
		if (["Mythic Item", "Unique Item"].includes(item.rarity)) {
			return (item as UniqueItem).uniqueBonus.some((bonus) => {
				if (typeof bonus.bonus === "string") return bonus.bonus.toLowerCase().includes(selectedEffect.toLowerCase());
			});
		}
		if (["Mythic Item", "Set Item"].includes(item.rarity)) {
			return (item as SetItem).set?.setBonus.some((setBonus) => {
				if (typeof setBonus.bonus === "string") {
					return setBonus.bonus.toLowerCase().includes(selectedEffect.toLowerCase());
				} else {
					return selectedStats.includes(setBonus.bonus.stat);
				}
			});
		}
		return false;
	};
	const filterSetName = (item: Item) => {
		if (!selectedSetName) return true;
		if (["Mythic Item", "Set Item"].includes(item.rarity))
			return (item as SetItem).set?.name.toLowerCase().includes(selectedSetName.toLowerCase());
		return false;
	};

	const filteredItems = useMemo(() => {
		return items
			?.filter((item) => filterRarity(item as Item))
			?.filter((item) => filterSlot(item as Item))
			?.filter((item) => filterStats(item as Item))
			?.filter((item) => filterName(item as Item))
			?.filter((item) => filterEffect(item as Item))
			?.filter((item) => filterSetName(item as Item));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items, selectedRarity, selectedSlot, selectedStats, selectedName, selectedEffect, selectedSetName]);

	const resetFilters = () => {
		setSelectedRarity(undefined);
		setSelectedSlot(undefined);
		setSelectedStats([]);
		setSelectedName("");
		setSelectedEffect("");
		setSelectedSetName("");
	};

	return (
		<div className="flex flex-col gap-10 p-10">
			<div className={`flex w-full flex-col gap-2 3xl:flex-row px-[${padding}px] items-center justify-center`}>
				<div className="flex w-full flex-col items-center justify-center gap-2 xl:flex-row">
					<Select value={selectedRarity ?? ""} onValueChange={(value) => setSelectedRarity(value as Rarity)}>
						<SelectTrigger className="w-full min-w-[200px] max-w-[400px]">
							<SelectValue
								placeholder={
									<span className="flex items-center text-muted-foreground">
										<Filter className="mr-2 h-4 w-4" />
										Select a rarity
									</span>
								}
							>
								<span className="flex items-center text-foreground">
									<Filter className="mr-2 h-4 w-4" />
									{selectedRarity}
								</span>
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{Object.values(Rarities).map((rarity) => (
								<SelectItem key={rarity} value={rarity}>
									{rarity}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select
						value={selectedSlot ? (typeof selectedSlot === "string" ? selectedSlot : selectedSlot.join(", ")) : ""}
						onValueChange={(value) => setSelectedSlot(value as Slot | Slot[])}
					>
						<SelectTrigger className="w-full min-w-[200px] max-w-[400px]">
							<SelectValue
								placeholder={
									<span className="flex items-center text-muted-foreground">
										<Filter className="mr-2 h-4 w-4" />
										Select a slot
									</span>
								}
							>
								<span className="flex items-center text-foreground">
									<Filter className="mr-2 h-4 w-4" />
									{selectedSlot}
								</span>
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{availableSlots.map((slot) => (
								<SelectItem
									key={slot.commonName}
									value={typeof slot.itemSlot === "string" ? slot.itemSlot : slot.itemSlot.join(", ")}
								>
									{slot.commonName}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<MultiSelect
						icon={Filter}
						placeholder={
							<span className="flex items-center text-muted-foreground">
								<Filter className="mr-2 h-4 w-4" />
								Select one or more stats
							</span>
						}
						options={Object.values(StatTypes).map((stat) => ({ label: stat, value: stat }))}
						selectedOptions={selectedStats ?? []}
						setSelectedOptions={setSelectedStats}
					/>
				</div>
				<div className="flex w-full flex-col items-center justify-center gap-2 xl:flex-row">
					<Input
						icon={Search}
						placeholder="Search by name"
						value={selectedName}
						onChange={(e) => setSelectedName(e.target.value)}
						className="min-w-[210px] max-w-[400px]"
					/>
					<Input
						icon={Search}
						placeholder="Search by effect"
						value={selectedEffect}
						onChange={(e) => setSelectedEffect(e.target.value)}
						className="min-w-[210px] max-w-[400px]"
					/>
					<Input
						icon={Search}
						placeholder="Search by set name"
						value={selectedSetName}
						onChange={(e) => setSelectedSetName(e.target.value)}
						className="min-w-[210px] max-w-[400px]"
					/>
				</div>
				<Button onClick={resetFilters} variant="destructive">
					Reset
					<RefreshCcw className="h-4 w-4" />
				</Button>
			</div>
			<div className="flex w-full flex-col items-center gap-4" ref={ref}>
				{isLoading ? (
					<ClipLoader className="mt-10 h-10 w-10" color="#cdb485" />
				) : filteredItems?.length === 0 ? (
					<span className="w-full text-center italic text-muted-foreground">No items found</span>
				) : (
					<div
						className={`mx-auto px-[${padding}px] grid`}
						style={{
							gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
							gridGap: `${itemsGap}px`,
						}}
					>
						{filteredItems?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)?.map((item, _) => (
							<Link
								href={`/items/${params.className}/${item.name}`}
								key={_}
								className="cursor-pointer overflow-hidden"
								style={{
									backgroundImage: `url(/images/db/items/${item.image}.png)`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									width: `${itemWidth}px`,
									height: `${itemWidth}px`,
								}}
							>
								<span
									className={`flex h-full max-h-${itemWidth} w-full max-w-${itemWidth} flex-wrap content-center justify-center overflow-hidden bg-black/70 p-2 text-center text-sm opacity-0 transition-opacity duration-300 hover:opacity-100`}
								>
									{item.name}
								</span>
							</Link>
						))}
					</div>
				)}
				<Pagination
					items={filteredItems?.length ?? 0}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					itemsName="items"
				/>
			</div>
		</div>
	);
}
