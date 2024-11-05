"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMeasure } from "@uidotdev/usehooks";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type Option<V> = { label: string; value: V };

interface ISelectProps<V> {
	placeholder: ReactNode;
	icon?: any;
	className?: string;
	options: Option<V>[];
	selectedOptions: V[];
	setSelectedOptions: Dispatch<SetStateAction<V[]>>;
}

const MultiSelect = <V,>({
	placeholder,
	icon,
	className,
	options: values,
	selectedOptions: selectedItems,
	setSelectedOptions: setSelectedItems,
}: ISelectProps<V>) => {
	const handleSelectChange = (value: V) => {
		if (!selectedItems.includes(value)) {
			const previousItems = [...selectedItems];
			previousItems.push(value);
			setSelectedItems(previousItems);
		} else {
			const referencedArray = [...selectedItems];
			const indexOfItemToBeRemoved = referencedArray.indexOf(value);
			referencedArray.splice(indexOfItemToBeRemoved, 1);
			setSelectedItems(referencedArray);
		}
	};

	const [ref, { width }] = useMeasure();
	const [dropdownWidth, setDropdownWidth] = useState(0);

	useEffect(() => {
		setDropdownWidth(width || 0);
	}, [width]);

	const Icon = icon;

	const isOptionSelected = (value: V): boolean => {
		return selectedItems.includes(value) ? true : false;
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="min-w-[300px] max-w-[400px]">
					<Button variant="outline" className="flex w-full items-center justify-between" ref={ref}>
						<div className={`${selectedItems.length > 0 ? "text-foreground" : "text-muted-foreground"} w-full`}>
							<span className={cn("flex min-w-[250px] max-w-[350px] items-center", className)}>
								{icon && selectedItems.length > 0 && <Icon className="mr-2 h-4 w-4" />}
								<span className="overflow-hidden text-ellipsis whitespace-nowrap">
									{selectedItems.length > 3
										? `${selectedItems.slice(0, 2).join(", ")} and ${selectedItems.length - 2} more`
										: selectedItems.length > 0
											? selectedItems.join(", ")
											: placeholder}
								</span>
							</span>
						</div>
						<ChevronDown className="h-4 w-4 opacity-50" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className={`max-h-[--radix-dropdown-content-available-height] w-[${dropdownWidth}px]`}
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					{values.map((value: Option<V>, index: number) => {
						return (
							<DropdownMenuCheckboxItem
								onSelect={(e) => e.preventDefault()}
								key={index}
								checked={isOptionSelected(value.value)}
								onCheckedChange={() => handleSelectChange(value.value)}
							>
								{value.label}
							</DropdownMenuCheckboxItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default MultiSelect;
