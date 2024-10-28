import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, ...props }, ref) => {
	const Icon = icon;

	return (
		<div className={cn("relative w-full", className)}>
			<input
				type={type}
				className={cn(
					"peer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					icon && "pl-10",
					className
				)}
				ref={ref}
				{...props}
			/>
			{icon && (
				<Icon
					className={cn(
						"absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transform text-foreground peer-placeholder-shown:text-muted-foreground",
					)}
				/>
			)}
		</div>
	);
});
Input.displayName = "Input";

export { Input };
