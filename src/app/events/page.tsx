"use client";

import EventCalendar from "@/components/event-calendar";
import { Separator } from "@/components/ui/separator";
import { events } from "@/data/real-time/events";
import { formatDate, isAfter, isWithinInterval } from "date-fns";

export default function EventsPage() {
	const currentEvents = events.filter((event) => {
		return isWithinInterval(new Date(), { start: event.startDate, end: event.endDate });
	});

	const upcomingEvents = events.filter((event) => {
		return isAfter(event.startDate, new Date());
	});

	return (
		<div className="mb-10 flex w-full flex-col items-start justify-start gap-8 px-6 md:px-10 4xl:flex-row">
			<div className="w-full 4xl:w-3/12">
				<h2 className="px-3 pb-6 pt-10 text-2xl font-extrabold text-custom-main">Active Events</h2>
				<ul className="space-y-4">
					{currentEvents.length <= 0 && <div className="text-center italic text-gray-400">No Events Present</div>}
					{currentEvents.length > 0 &&
						currentEvents.map((event, index) => (
							<li className="rounded-md border-2 px-4 py-2 shadow" key={index} style={{ color: event.color }}>
								{event.title}
								<br />
								<label className="text-muted-foreground">
									{formatDate(event.startDate, "MMM d, yyyy")} - {formatDate(event.endDate, "MMM d, yyyy")}
								</label>
							</li>
						))}
				</ul>
				<Separator className="my-10" />
				<h2 className="px-3 pb-6 text-2xl font-extrabold text-custom-main">Upcoming Events</h2>
				<ul className="space-y-4">
					{upcomingEvents.length <= 0 && <div className="text-center italic text-gray-400">No Events Present</div>}
					{upcomingEvents.map((event, index) => (
						<li className="rounded-md border-2 px-4 py-2 shadow" key={index} style={{ color: event.color }}>
							{event.title}
							<br />
							<label className="text-muted-foreground">
								{formatDate(event.startDate, "MMM d, yyyy")} - {formatDate(event.endDate, "MMM d, yyyy")}
							</label>
						</li>
					))}
				</ul>
			</div>
			<EventCalendar events={events} />
		</div>
	);
}
