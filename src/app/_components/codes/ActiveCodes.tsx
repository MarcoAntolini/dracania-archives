"use client";

import Pagination from "@/components/Pagination";
import { Inter } from "next/font/google";
import { useState } from "react";
import codes from "./codes";

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
			const releaseDate = new Date(code.releaseDate).getTime() - 2000000;
			const totalMilliseconds = expirationDate - releaseDate;
			const totalSeconds = Math.max(0, Math.floor(totalMilliseconds / 1000));
			const percentageElapsed = Math.floor(((totalSeconds - secondsLeft) / totalSeconds) * 100);
			return { ...code, secondsLeft, minutesLeft, hoursLeft, daysLeft, weeksLeft, percentageElapsed };
		})
		.sort((a, b) => a.secondsLeft! - b.secondsLeft!);

	return (
		<div className="lg:w-[450px] max-w-[90%] w-[90%] border border-main-color rounded-lg p-5">
			<h2 className="text-2xl font-semibold text-main-color">Active Codes</h2>
			<ul>
				{activeCodes.slice((currentPage - 1) * codesPerPage, currentPage * codesPerPage).map((code) => {
					return (
						<li key={code.code} className="mt-4">
							<div className="flex justify-between">
								<span className={`${inter.className} text-main-color`}>{code.code}</span>
								<p className="text-[#565656]">Expires on {code.expirationDate}</p>
							</div>
							<div className="flex gap-2 md:gap-3">
								<div className="w-[150px] md:w-[180px] h-[15px] rounded mt-1 bg-stone-300">
									<div
										style={{ width: `${code.percentageElapsed}%` }}
										className={`${
											code.secondsLeft <= 86400
												? "bg-red-400"
												: code.secondsLeft <= 604800
												? "bg-yellow-400"
												: "bg-green-400"
										} rounded h-full`}
									></div>
								</div>
								<p className="text-sm md:text-base">
									{code.secondsLeft <= 86400
										? `${
												code.hoursLeft > 0
													? `${code.hoursLeft == 1 ? `${code.hoursLeft} hour and ` : `${code.hoursLeft} hours and `}`
													: ""
										  }${
												code.minutesLeft == 1 ? `${code.minutesLeft} minute left` : `${code.minutesLeft} minutes left`
										  } `
										: code.secondsLeft <= 604800
										? `${
												code.daysLeft > 0
													? `${code.daysLeft == 1 ? `${code.daysLeft} day and ` : `${code.daysLeft} days and `}`
													: ""
										  }${
												code.hoursLeft % 24 == 1
													? `${code.hoursLeft % 24} hour left`
													: `${code.hoursLeft % 24} hours left`
										  } `
										: `${
												code.weeksLeft > 0
													? `${code.weeksLeft == 1 ? `${code.weeksLeft} week and ` : `${code.weeksLeft} weeks and `}`
													: ""
										  }${
												code.daysLeft > 0
													? `${code.daysLeft == 1 ? `${code.daysLeft} day left ` : `${code.daysLeft} days left`} `
													: ""
										  }
										`}
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
