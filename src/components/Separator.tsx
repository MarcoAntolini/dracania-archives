export default function Separator({ color, className }: { color: string; className?: string }) {
	return (
		<div
			style={{
				background: `linear-gradient(90deg, transparent, ${color} 50%, transparent)`,
				width: "100%",
				height: "1px",
			}}
			className={className}
		></div>
	);
}
