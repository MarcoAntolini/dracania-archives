import { cn } from "@/lib/utils";

export default function CustomSeparator({ type, className }: { type: "main" | "item-stats-info"; className?: string }) {
	return (
		<div
			className={cn(
				className,
				type === "main" ? "bg-gradient-custom-main" : `bg-gradient-custom-item-stats-info`,
				"h-[1px] w-full",
			)}
		/>
	);
}
