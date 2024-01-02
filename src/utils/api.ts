import { type Class, type Item, type Rarity, type Slot, type StatType } from "dso-database";

const baseUrl = "https://api.dracania-archives.com";
const itemsUrl = "/items";

const db = {
	items: {
		getAll: async function (className: Class): Promise<Item[]> {
			return await fetch(baseUrl + itemsUrl, {
				method: "POST",
				body: JSON.stringify({
					className: className,
				}),
			}).then((response) => response.json());
		},
		filter: async function ({
			className,
			rarity,
			slot,
			stat,
			name,
		}: {
			className: Class;
			rarity?: Rarity;
			slot?: Slot | Slot[];
			stat?: StatType | StatType[];
			name?: string;
		}): Promise<Item[]> {
			return await fetch(baseUrl + itemsUrl, {
				method: "POST",
				body: JSON.stringify({
					className: className,
					rarity: rarity,
					slot: slot,
					stat: stat,
					name: name,
				}),
			}).then((response) => response.json());
		},
		getByName: async function (className: Class, name: string): Promise<Item[]> {
			return await fetch(baseUrl + itemsUrl, {
				method: "POST",
				body: JSON.stringify({
					className: className,
					name: name,
				}),
			}).then((response) => response.json());
		},
	},
};

export default db;
