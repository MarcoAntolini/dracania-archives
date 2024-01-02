"use client";

import Pagination from "@/components/Pagination";
import codes from "@/data/codes";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function ActiveCodes() {
	const [currentPage, setCurrentPage] = useState(1);
	const codesPerPage = 5;
	const now = Date.now();
	const activeCodes = codes
		.filter((code) => {
			const expirationDate = new Date(code.expirationDate).getTime();
			return expirationDate > now;
		})
		.map((code) => {
			const expirationDate = new Date(code.expirationDate).getTime();
			const millisecondsLeft = expirationDate - now;
			const secondsLeft = Math.floor(millisecondsLeft / 1000);
			const minutesLeft = Math.floor(secondsLeft / 60) % 60;
			const hoursLeft = Math.floor(secondsLeft / 60 / 60) % 24;
			const daysLeft = Math.floor(secondsLeft / 60 / 60 / 24) % 7;
			const weeksLeft = Math.floor(secondsLeft / 60 / 60 / 24 / 7);
			const releaseDate = new Date(code.releaseDate).getTime() - 3600000;
			const totalMilliseconds = expirationDate - releaseDate;
			const totalSeconds = Math.max(0, Math.floor(totalMilliseconds / 1000));
			const percentageElapsed = Math.floor(((totalSeconds - secondsLeft) / totalSeconds) * 100);
			return { ...code, secondsLeft, minutesLeft, hoursLeft, daysLeft, weeksLeft, percentageElapsed };
		})
		.sort((a, b) => a.secondsLeft! - b.secondsLeft!);

	return (
		<div className="border-main w-[90%] max-w-[90%] rounded-lg border p-5 lg:w-[450px]">
			<h2 className="text-main text-2xl font-semibold">Active Codes</h2>
			{activeCodes.length === 0 && (
				<p className="mb-1 mt-4 text-center text-gray-400">There are no active codes at the moment</p>
			)}
			<ul>
				{activeCodes.slice((currentPage - 1) * codesPerPage, currentPage * codesPerPage).map((code) => {
					return (
						<li key={code.code} className="mt-4">
							<div className="flex justify-between">
								<span className={`${inter.className} text-main`}>{code.code}</span>
								<p className="text-sm text-[#565656] md:text-base">Expires on {code.expirationDate}</p>
							</div>
							<div className="flex gap-2 md:gap-3">
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
							</div>
						</li>
					);
				})}
			</ul>
			<Pagination
				items={activeCodes.length}
				itemsPerPage={codesPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}
