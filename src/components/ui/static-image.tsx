/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import type { ImgHTMLAttributes } from "react";

type StaticImageProps = ImgHTMLAttributes<HTMLImageElement> & {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
};

export function StaticImage({ src, alt, width, height, fill, className, ...props }: StaticImageProps) {
	if (fill) {
		return (
			<img
				src={src}
				alt={alt}
				className={cn("absolute inset-0 h-full w-full object-cover", className)}
				loading="lazy"
				decoding="async"
				{...props}
			/>
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			loading="lazy"
			decoding="async"
			{...props}
		/>
	);
}
