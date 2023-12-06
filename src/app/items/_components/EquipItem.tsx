import Separator from "@components/Separator";
import { Rarities, type Bonus, type Item, type MythicItem, type SetItem, type UniqueItem } from "dso-database";

export default function EquipItem({ item }: { item: Item }) {
	return (
		<div className="item flex flex-col p-4 w-[500px] max-w-[95vw]">
			<h1 className={`${item.rarity.split(" ")[0].toLowerCase().concat("-name")} text-center`}>{item.name}</h1>
			<div className="my-1">
				<p className={item.rarity.split(" ")[0].toLowerCase().concat("-label")}>{item.rarity}</p>
				<p className="slot">{item.slot}</p>
				<p className="level">Item level: {item.level}</p>
			</div>
			<Separator color="#9d9d9d" className="my-[5px]" />
			<div>
				<p className="stats-info text-center">Base Values</p>
				{item.stats.map((stat) => (
					<p key={stat.stat} className="stat">
						+ {stat.minValue}-{stat.maxValue} {stat.stat}
					</p>
				))}
			</div>
			<Separator color="#9d9d9d" className="my-[5px]" />
			{item.rarity === Rarities.uniqueItem && EquipItemUnique({ item })}
			{item.rarity === Rarities.setItem && EquipItemSet({ item })}
			{item.rarity === Rarities.mythicItem && EquipItemMythic({ item })}
		</div>
	);
}

function EquipItemUnique({ item }: { item: UniqueItem | MythicItem }) {
	const uniqueBonus = item.uniqueBonus!;
	return (
		<>
			<p className="stats-info text-center">Unique Values</p>
			{uniqueBonus.map((bonus, idx) => (
				<p key={idx} className="unique-stat">
					{getBonus(bonus)}
				</p>
			))}
		</>
	);
}

function EquipItemSet({ item }: { item: SetItem | MythicItem }) {
	const set = item.set!;
	return (
		<>
			<p className="set-info">
				{set.name} ({set.items.length} pieces)
			</p>
			<div className="pl-6">
				{set.items.map((setItem) => (
					<p key={setItem} className="set-value">
						{setItem}
					</p>
				))}
			</div>
			<p className="set-info">Bonus for pieces of equipment belonging to the same set:</p>
			<div className="pl-6">
				{set.setBonus.map((bonus, idx) => (
					<p key={idx} className="set-value">
						({bonus.requiredItems}): {getBonus(bonus)}
					</p>
				))}
			</div>
		</>
	);
}

function EquipItemMythic({ item }: { item: MythicItem }) {
	return (
		<>
			<div>
				{item.uniqueBonus && <EquipItemUnique item={item} />}
				{item.set && <EquipItemSet item={item} />}
			</div>
		</>
	);
}

function getBonus({ bonus }: { bonus: Bonus }) {
	return typeof bonus === "string" ? bonus : `+ ${bonus.value} ${bonus.stat}`;
}
