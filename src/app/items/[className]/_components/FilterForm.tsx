"use client";

import { availableSlots } from "@/types/slots";
import db from "@/utils/api";
import { useMouseFocus } from "@/utils/hooks";
import type { Class, Item, Slot } from "dso-database";
import { Rarities, StatTypes, type Rarity, type StatType } from "dso-database";
import { useQueryState } from "next-usequerystate";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type SelectedSlot = Slot | Slot[] | undefined;
type SelectedStat = StatType | StatType[] | undefined;
type SelectedRarity = Rarity | undefined;
type SelectedName = string | undefined;

const optionsByType = {
	slot: availableSlots,
	stat: Object.values(StatTypes),
	rarity: Object.values(Rarities),
};

export default function FilterForm({
	selectedClass,
	setItems,
	setCurrentPage,
}: {
	selectedClass: Class;
	setItems: Dispatch<SetStateAction<Item[]>>;
	setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
	const [querySlot, setQuerySlot] = useQueryState("slot");
	const [queryStat, setQueryStat] = useQueryState("stat");
	const [queryRarity, setQueryRarity] = useQueryState("rarity");
	const [queryName, setQueryName] = useQueryState("name");
	useEffect(() => {
		if (!availableSlots.find((s) => s.commonName === querySlot)) {
			setQuerySlot(null);
		}
		if (!Object.values(StatTypes).includes(queryStat as StatType)) {
			setQueryStat(null);
			setSelectedStat(undefined);
		}
		if (!Object.values(Rarities).includes(queryRarity as Rarity)) {
			setQueryRarity(null);
			setSelectedRarity(undefined);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>(
		(availableSlots.find((s) => s.commonName === querySlot)?.itemSlot as Slot | Slot[]) ?? undefined,
	);
	const [selectedStat, setSelectedStat] = useState<SelectedStat>((queryStat as StatType) ?? undefined);
	const [selectedRarity, setSelectedRarity] = useState<SelectedRarity>((queryRarity as Rarity) ?? undefined);
	const [selectedName, setSelectedName] = useState<SelectedName>((queryName as string) ?? undefined);

	const fetchAndSetItems = async () => {
		setItems(
			await db.items.filter({
				className: selectedClass,
				slot: selectedSlot,
				stat: selectedStat,
				rarity: selectedRarity,
				name: selectedName,
			}),
		);
	};

	const resetPage = () => {
		setCurrentPage(1);
	};

	useMouseFocus();

	useEffect(() => {
		fetchAndSetItems();
	}, [selectedSlot, selectedStat, selectedRarity, selectedName]); // eslint-disable-line react-hooks/exhaustive-deps

	function renderSelect(
		type: keyof typeof optionsByType,
		setFunction: React.Dispatch<React.SetStateAction<any>>,
		setQuery: React.Dispatch<React.SetStateAction<any>>,
	) {
		return (
			<select
				className={`filter-input h-[43px] w-full ${
					type === "slot" && selectedSlot === undefined
						? "text-gray-400"
						: type === "stat" && selectedStat === undefined
							? "text-gray-400"
							: type === "rarity" && selectedRarity === undefined
								? "text-gray-400"
								: "text-white"
				}`}
				onChange={(e) => {
					setFunction(e.target.value === "" ? undefined : e.target.value);
					setQuery(e.target.selectedOptions[0].id !== "" ? e.target.selectedOptions[0].id : e.target.value);
				}}
				defaultValue={
					(type === "slot"
						? Array.isArray(selectedSlot)
							? selectedSlot.join(" - ")
							: selectedSlot
						: type === "stat"
							? selectedStat
							: type === "rarity"
								? selectedRarity
								: "") ?? ""
				}
			>
				<option value={""} hidden>
					{`Select ${type}`}
				</option>
				{type === "slot"
					? optionsByType[type].map((option) => (
							<option
								key={option.commonName}
								value={Array.isArray(option.itemSlot) ? option.itemSlot.join(" - ") : option.itemSlot}
								id={option.commonName}
							>
								{option.commonName}
							</option>
						))
					: optionsByType[type].map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
			</select>
		);
	}

	async function resetFilters() {
		setSelectedSlot(undefined);
		setSelectedStat(undefined);
		setSelectedRarity(undefined);
		setSelectedName(undefined);
		setQuerySlot(null);
		setQueryStat(null);
		setQueryRarity(null);
		setQueryName(null);
		document.querySelectorAll("select").forEach((select) => {
			select.value = "";
		});
		document.querySelectorAll("input").forEach((input) => {
			input.value = "";
		});
	}

	return (
		<div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
			<div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:gap-4">
				{renderSelect("slot", setSelectedSlot, setQuerySlot)}
				{renderSelect("stat", setSelectedStat, setQueryStat)}
				{renderSelect("rarity", setSelectedRarity, setQueryRarity)}
				<input
					className="filter-input w-full"
					type="text"
					placeholder="Enter item name"
					onChange={(e) => {
						setSelectedName(e.target.value);
						setQueryName(e.target.value === "" ? null : e.target.value);
					}}
					value={(queryName as string) ?? ""}
					maxLength={30}
				/>
			</div>
			<div className="flex justify-between gap-4">
				<button
					className="filter-input filter-button"
					onClick={() => {
						resetFilters();
						resetPage();
					}}
				>
					Reset
				</button>
				{/* <button
					className="filter-input filter-button"
					onClick={async () => {
						await fetchAndSetItems();
						resetPage();
					}}
				>
					Filter
				</button> */}
			</div>
		</div>
	);
}
