"use client";

import Pagination from "@/components/Pagination";
import { Rarities, Slots, StatTypes, type Item, type Rarity, type Slot, type StatType } from "dso-database";
import { useState } from "react";
import { classes } from "../page";

const optionsByType = {
	slot: Object.values(Slots),
	stat: Object.values(StatTypes),
	rarity: Object.values(Rarities),
};

// type StorageType = "session" | "local";
// type UseStorageReturnValue = {
// 	getItem: (key: string, type?: StorageType) => string;
// 	setItem: (key: string, value: string, type?: StorageType) => boolean;
// 	removeItem: (key: string, type?: StorageType) => void;
// };

// const useStorage = (): UseStorageReturnValue => {
// 	const storageType = (type?: StorageType): "localStorage" | "sessionStorage" => `${type ?? "session"}Storage`;

// 	const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

// 	const getItem = (key: string, type?: StorageType): string => {
// 		return isBrowser ? window[storageType(type)][key] : "";
// 	};

// 	const setItem = (key: string, value: string, type?: StorageType): boolean => {
// 		if (isBrowser) {
// 			window[storageType(type)].setItem(key, value);
// 			return true;
// 		}

// 		return false;
// 	};

// 	const removeItem = (key: string, type?: StorageType): void => {
// 		window[storageType(type)].removeItem(key);
// 	};

// 	return {
// 		getItem,
// 		setItem,
// 		removeItem,
// 	};
// };

export default function Page({ params }: { params: { className: string } }) {
	const selectedClass = classes.find((c) => c.commonName.toLowerCase() === params.className)?.name;
	const [selectedSlot, setSelectedSlot] = useState<Slot | Slot[]>();
	const [selectedStats, setSelectedStats] = useState<StatType | StatType[]>();
	const [selectedRarity, setSelectedRarity] = useState<Rarity | Rarity[]>();
	const [selectedName, setSelectedName] = useState<string>();

	// const { getItem, setItem, removeItem } = useStorage();

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;

	// ! this one is a temp
	const items: Item[] | undefined = undefined;

	function renderSelect(type: keyof typeof optionsByType, setFunction: React.Dispatch<React.SetStateAction<any>>) {
		return (
			<select
				className="text-black"
				onChange={(e) => {
					setFunction(e.target.value === "" ? undefined : e.target.value);
				}}
				defaultValue={""}
			>
				<option value="" disabled hidden>
					{`Select ${type}`}
				</option>
				{optionsByType[type].map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	}

	function resetFilters() {
		setSelectedSlot(undefined);
		setSelectedStats(undefined);
		setSelectedRarity(undefined);
		setSelectedName(undefined);
		document.querySelectorAll("select").forEach((select) => {
			select.value = "";
		});
		document.querySelectorAll("input").forEach((input) => {
			input.value = "";
		});
	}

	function filterItems() {
		// call api
	}

	return (
		<div className="p-5">
			My Post: {params.className}
			<div className="flex md:flex-row md:justify-between flex-col">
				{renderSelect("slot", setSelectedSlot)}
				{renderSelect("stat", setSelectedStats)}
				{renderSelect("rarity", setSelectedRarity)}
				<input
					className="text-black"
					type="text"
					placeholder="Enter item name"
					onChange={(e) => {
						setSelectedName(e.target.value);
					}}
				/>
				<button onClick={filterItems}>Search</button>
				<button onClick={resetFilters}>Reset</button>
			</div>
			<div>
				<h1>Results:</h1>
				<p>Class: {selectedClass}</p>
				<p>Slot: {selectedSlot}</p>
				<p>Stats: {selectedStats}</p>
				<p>Rarity: {selectedRarity}</p>
				<p>Name: {selectedName}</p>
			</div>
			<div>
				{/* <div>
					{items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
						// TODO add item
						<div key={item.name}>{item.name}</div>
					))}
				</div> */}
				<Pagination
					items={0} // TODO change this to items.length
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				></Pagination>
			</div>
		</div>
	);
}
