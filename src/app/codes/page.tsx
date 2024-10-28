"use client";

import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import codes from "@/data/real-time/codes";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function CodesPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const codesPerPage = 5;
	const now = Date.now();
	const activeCodes = codes
		.filter((code) => {
			const expirationDate = moment(code.expirationDate, "DD-MM-YYYY").toDate();
			return expirationDate.getTime() > now;
		})
		.sort(
			(a, b) =>
				moment(b.releaseDate, "DD-MM-YYYY").toDate().getTime() - moment(a.releaseDate, "DD-MM-YYYY").toDate().getTime(),
		)
		.map((code) => {
			const expirationDate = moment(code.expirationDate, "DD-MM-YYYY").toDate();
			const daysRemaining = Math.floor((expirationDate.getTime() - now) / (1000 * 60 * 60 * 24));
			return { ...code, daysRemaining };
		});
	const expiredCodes = codes
		.filter((code) => {
			const expirationDate = moment(code.expirationDate, "DD-MM-YYYY").toDate();
			return expirationDate.getTime() < now;
		})
		.sort(
			(a, b) =>
				moment(b.releaseDate, "DD-MM-YYYY").toDate().getTime() - moment(a.releaseDate, "DD-MM-YYYY").toDate().getTime(),
		);
	// const activeCodes = codes
	// 	.filter((code) => {
	// 		const expirationDate = new Date(code.expirationDate).getTime();
	// 		console.log(expirationDate);
	// 		return expirationDate > now;
	// 	})
	// 	.map((code) => {
	// 		const expirationDate = new Date(code.expirationDate).getTime();
	// 		const millisecondsLeft = expirationDate - now;
	// 		const secondsLeft = Math.floor(millisecondsLeft / 1000);
	// 		const minutesLeft = Math.floor(secondsLeft / 60) % 60;
	// 		const hoursLeft = Math.floor(secondsLeft / 60 / 60) % 24;
	// 		const daysLeft = Math.floor(secondsLeft / 60 / 60 / 24) % 7;
	// 		const weeksLeft = Math.floor(secondsLeft / 60 / 60 / 24 / 7);
	// 		const releaseDate = new Date(code.releaseDate).getTime() - 3600000;
	// 		const totalMilliseconds = expirationDate - releaseDate;
	// 		const totalSeconds = Math.max(0, Math.floor(totalMilliseconds / 1000));
	// 		const percentageElapsed = Math.floor(((totalSeconds - secondsLeft) / totalSeconds) * 100);
	// 		return { ...code, secondsLeft, minutesLeft, hoursLeft, daysLeft, weeksLeft, percentageElapsed };
	// 	})
	// 	.sort((a, b) => a.secondsLeft! - b.secondsLeft!);

	return (
		<PhotoProvider>
			<div className="flex max-w-full flex-col 6 py-10 md:px-10 4xl:flex-row">
				<div className="flex flex-col gap-4 4xl:w-1/2">
					<h2 className="mb-2 px-3 text-2xl text-custom-main">Active Bonus Codes</h2>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Code</TableHead>
								<TableHead className="min-w-[125px]">Release Date</TableHead>
								<TableHead className="min-w-[145px]">Expiration Date</TableHead>
								<TableHead className="w-[471px]">Screenshot</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{activeCodes.slice((currentPage - 1) * codesPerPage, currentPage * codesPerPage).map((code) => {
								return (
									<TableRow key={code.code}>
										<TableCell className="font-tahoma font-bold text-custom-main">{code.code}</TableCell>
										<TableCell>{code.releaseDate}</TableCell>
										<TableCell
											className={`${
												code.daysRemaining <= 1
													? "text-red-600"
													: code.daysRemaining <= 3
														? "text-yellow-600"
														: "text-green-600"
											}`}
										>
											{code.expirationDate}
										</TableCell>
										<TableCell>
											<PhotoView src={`/images/db/codes/${code.code}.png`} key={code.code}>
												<Image
													src={`/images/db/codes/${code.code}.png`}
													alt={code.code}
													width={471}
													height={250}
													className="cursor-pointer"
												/>
											</PhotoView>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<Pagination
						items={activeCodes.length}
						itemsPerPage={5}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						itemsName="codes"
					/>
				</div>
				<Separator className="my-10 4xl:hidden" />
				<div className="flex flex-col gap-4 4xl:w-1/2">
					<h2 className="mb-2 px-3 text-2xl text-custom-main">Expired Bonus Codes</h2>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Code</TableHead>
								<TableHead className="min-w-[125px]">Release Date</TableHead>
								<TableHead className="min-w-[145px]">Expiration Date</TableHead>
								<TableHead className="w-[471px]">Screenshot</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{expiredCodes.slice((currentPage - 1) * codesPerPage, currentPage * codesPerPage).map((code) => {
								return (
									<TableRow key={code.code}>
										<TableCell className="font-tahoma font-bold text-custom-main">{code.code}</TableCell>
										<TableCell>{code.releaseDate}</TableCell>
										<TableCell className="text-red-600">{code.expirationDate}</TableCell>
										<TableCell>
											<PhotoView src={`/images/db/codes/${code.code}.png`} key={code.code}>
												<Image
													src={`/images/db/codes/${code.code}.png`}
													alt={code.code}
													width={471}
													height={250}
													className="cursor-pointer"
												/>
											</PhotoView>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<Pagination
						items={expiredCodes.length}
						itemsPerPage={5}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						itemsName="codes"
					/>
				</div>
				{/* <div className="flex gap-2 md:gap-3">
									<div className="mt-1 h-[15px] w-[130px] min-w-[130px] max-w-[130px] rounded bg-stone-300 md:w-[165px] md:min-w-[165px] md:max-w-[165px]">
										<div
											style={{ width: `${code.percentageElapsed}%` }}
											className={`${
												code.secondsLeft <= 86400
													? "bg-red-400"
													: code.secondsLeft <= 604800
														? "bg-yellow-400"
														: "bg-green-400"
											} h-full rounded`}
										></div>
									</div>
									<p className="text-sm md:text-base">
										{code.secondsLeft <= 86400
											? `${
													code.hoursLeft > 0
														? `${code.hoursLeft == 1 ? `${code.hoursLeft} hour` : `${code.hoursLeft} hours`}`
														: ""
												}${
													code.minutesLeft > 0
														? ` and ${
																code.minutesLeft == 1 ? `${code.minutesLeft} minute` : `${code.minutesLeft} minutes`
															}`
														: ""
												} left`
											: code.secondsLeft <= 604800
												? `${
														code.daysLeft > 0
															? `${code.daysLeft == 1 ? `${code.daysLeft} day` : `${code.daysLeft} days`}`
															: ""
													}${
														code.hoursLeft > 0
															? ` and ${code.hoursLeft == 1 ? `${code.hoursLeft} hour` : `${code.hoursLeft} hours`}`
															: ""
													} left`
												: `${
														code.weeksLeft > 0
															? `${code.weeksLeft == 1 ? `${code.weeksLeft} week` : `${code.weeksLeft} weeks`}`
															: ""
													}${
														code.daysLeft > 0
															? ` and ${code.daysLeft == 1 ? `${code.daysLeft} day` : `${code.daysLeft} days`} `
															: ""
													} left`}
									</p>
								</div> */}
			</div>
		</PhotoProvider>
	);
}
