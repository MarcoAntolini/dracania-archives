import CustomSeparator from "@/components/game/custom-separator";
import { Rarities } from "@/types/consts";
import { type Bonus, type Item, type ItemSet, type MythicItem, type UniqueItem } from "@/types/items";
import Link from "next/link";

export default function EquipItem({ item }: { item: Item }) {
	return (
		<div className="item flex h-fit w-[500px] max-w-[95vw] flex-col p-4">
			<h1 className={`${item?.rarity?.split(" ")[0].toLowerCase().concat("-name")} text-center`}>{item?.name}</h1>
			<div className="my-1">
				<p className={item?.rarity?.split(" ")[0].toLowerCase().concat("-label")}>{item?.rarity}</p>
				<p className="slot">({item?.slot})</p>
				<p className="level">Item level: {item?.level}</p>
			</div>
			<CustomSeparator type="item-stats-info" className="my-[5px]" />
			<div>
				<p className="stats-info text-center">Base Values</p>
				{item?.stats?.map((stat) => (
					<p key={stat.stat} className="stat">
						+ {stat.minValue}-{stat.maxValue} {stat.stat}
					</p>
				))}
			</div>
			<CustomSeparator type="item-stats-info" className="my-[5px]" />
			{item?.rarity === Rarities.uniqueItem && EquipItemUnique({ item })}
			{item?.rarity === Rarities.setItem && EquipItemSet({ set: item.set })}
			{item?.rarity === Rarities.mythicItem && EquipItemMythic({ item })}
		</div>
	);
}

function EquipItemUnique({ item }: { item: UniqueItem | MythicItem }) {
	const uniqueBonus = item?.uniqueBonus!;
	return (
		<>
			<p className="stats-info text-center">Unique Values</p>
			{uniqueBonus.map((bonus, _) => (
				<p key={_} className="unique-stat">
					{getBonus(bonus)}
				</p>
			))}
		</>
	);
}

export function EquipItemSet({ set }: { set: ItemSet }) {
	return (
		<>
			<p className="set-info">
				{set?.name} ({set?.items?.length} pieces)
			</p>
			<div className="flex flex-col pl-6">
				{set?.items?.map((setItem) => (
					<Link key={setItem} href={`${setItem}`} className="set-value hover:text-orange-300">
						{setItem}
					</Link>
				))}
			</div>
			<p className="set-info">Bonus for pieces of equipment belonging to the same set:</p>
			<div className="pl-6">
				{set?.setBonus?.map((bonus, _) => (
					<p key={_} className="set-value">
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
				{item?.uniqueBonus && <EquipItemUnique item={item} />}
				{item?.set && <EquipItemSet set={item.set} />}
			</div>
		</>
	);
}

function getBonus({ bonus }: { bonus: Bonus }) {
	return typeof bonus === "string" ? bonus : `+ ${bonus.value} ${bonus.stat}`;
}
