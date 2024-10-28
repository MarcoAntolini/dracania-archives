import type { ItemSet } from "@/types/items";
import { EquipItemSet } from "./item";

export default function EquipSet({ set }: { set: ItemSet }) {
	return (
		<div className="item flex w-[500px] max-w-[95vw] flex-col p-4">
			<EquipItemSet set={set} />
		</div>
	);
}
