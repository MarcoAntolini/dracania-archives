import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { addDays, addMonths, eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Event {
	title: string;
	startDate: Date;
	endDate: Date;
	color: string;
	textColor?: string;
}

interface EventCalendarProps {
	events: Event[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
	const [currentMonth, setCurrentMonth] = useState(new Date());

	const firstDayOfMonth = startOfMonth(currentMonth);
	const lastDayOfMonth = endOfMonth(currentMonth);

	const daysInMonth = eachDayOfInterval({
		start: firstDayOfMonth,
		end: lastDayOfMonth,
	});

	const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;

	const eventsByDate = useMemo(() => {
		return events.reduce((acc: { [key: string]: Event[] }, event) => {
			const startDateKey = format(event.startDate, "yyyy-MM-dd");
			const endDateKey = format(event.endDate, "yyyy-MM-dd");
			acc[startDateKey] = [...(acc[startDateKey] || []), event];
			if (startDateKey !== endDateKey) {
				const start = addDays(event.startDate, 1);
				const end = event.endDate;
				for (let day = start; day <= end; day = addDays(day, 1)) {
					const dayKey = format(day, "yyyy-MM-dd");
					acc[dayKey] = [...(acc[dayKey] || []), event];
				}
			}
			return acc;
		}, {});
	}, [events]);

	const renderEmptyDay = (day: Date, index: number) => {
		const dateKey = format(day, "yyyy-MM-dd");
		const todaysEvents = eventsByDate[dateKey] || [];
		return (
			<div
				key={`empty-${index}`}
				className={cn(
					"h-60 max-w-[300px] border-b border-r p-2 text-center text-muted-foreground/40",
					day.getDay() === 1 && "border-l",
				)}
			>
				{format(day, "d")}
				<Separator className="my-2" />
				<div className="flex flex-col gap-2">
					{todaysEvents.map((event, index) => (
						<Tooltip key={`${event.title}-${index}`}>
							<TooltipTrigger asChild>
								<div
									className={`cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-md px-1`}
									style={{ backgroundColor: event.color, color: event.textColor || "black" }}
								>
									{event.title}
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>{event.title}</p>
							</TooltipContent>
						</Tooltip>
					))}
				</div>
			</div>
		);
	};

	const renderDay = (day: Date, index: number) => {
		const dateKey = format(day, "yyyy-MM-dd");
		const todaysEvents = eventsByDate[dateKey] || [];
		return (
			<div
				key={index}
				className={cn(
					"h-60 max-w-[300px] border-b border-r p-2 text-center",
					isToday(day) && "bg-gradient-to-b from-slate-700/10 to-slate-500/20",
					day.getDay() === 1 && "border-l",
				)}
			>
				{format(day, "d")}
				<Separator className="my-2" />
				<div className="flex flex-col gap-2">
					{todaysEvents.map((event, index) => (
						<Tooltip key={`${event.title}-${index}`}>
							<TooltipTrigger asChild>
								<div
									className={`cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-md px-1`}
									style={{ backgroundColor: event.color, color: event.textColor || "black" }}
								>
									{event.title}
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>{event.title}</p>
							</TooltipContent>
						</Tooltip>
					))}
				</div>
			</div>
		);
	};

	const handlePreviousMonth = () => {
		setCurrentMonth((prev) => addMonths(prev, -1));
	};

	const handleNextMonth = () => {
		setCurrentMonth((prev) => addMonths(prev, 1));
	};

	const handleToday = () => {
		setCurrentMonth(new Date());
	};

	return (
		<TooltipProvider>
			<div className="mt-8 hidden w-full max-w-[2100px] xl:block 4xl:w-9/12">
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button variant="outline" onClick={handlePreviousMonth} className="p-2">
							<ChevronLeft />
						</Button>
						<Button variant="outline" onClick={handleNextMonth} className="p-2">
							<ChevronRight />
						</Button>
					</div>
					<h2 className="pr-[calc(92px-59.39px)] text-center text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
					<Button variant="outline" onClick={handleToday} className="p-2">
						Today
					</Button>
				</div>
				<div className="grid grid-cols-7">
					{WEEKDAYS.map((day, index) => (
						<div
							key={day}
							className={cn(
								"max-w-[300px] border-b border-r border-t p-2 text-center font-bold",
								index === 0 && "border-l",
							)}
						>
							{day}
						</div>
					))}
					{Array.from({ length: startingDayIndex }).map((_, index) => {
						const emptyDay = addDays(firstDayOfMonth, index - startingDayIndex);
						return renderEmptyDay(emptyDay, index);
					})}
					{daysInMonth.map((day, index) => renderDay(day, index))}
					{Array.from({ length: 7 - (getDay(lastDayOfMonth) % 7) }).map((_, index) => {
						if (getDay(lastDayOfMonth) % 7 === 0) {
							return null;
						}
						const emptyDay = addDays(lastDayOfMonth, index + 1);
						return renderEmptyDay(emptyDay, index);
					})}
				</div>
			</div>
		</TooltipProvider>
	);
};

export default EventCalendar;
