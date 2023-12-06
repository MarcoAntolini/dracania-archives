"use client";

import { Inter } from "next/font/google";
import codes from "./codes";

const inter = Inter({ subsets: ["latin"] });

export default function ActiveCodes() {
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
			return { ...code, secondsLeft };
		})
		.sort((a, b) => a.secondsLeft! - b.secondsLeft!);

	return (
		<div className="md:w-[450px] max-w-[90%] w-[90%] border border-main-color rounded-lg p-5">
			<h2 className="text-2xl font-semibold text-main-color">Active Codes</h2>
			<ul>
				{activeCodes.map((code) => {
					const expirationDate = new Date(code.expirationDate).getTime();
					const releaseDate = new Date(code.releaseDate).getTime() - 2000000;
					const totalMilliseconds = expirationDate - releaseDate;
					const totalSeconds = Math.max(0, Math.floor(totalMilliseconds / 1000));
					const percentageElapsed = Math.floor(((totalSeconds - code.secondsLeft) / totalSeconds) * 100);
					const minutesLeft = Math.floor(code.secondsLeft / 60) % 60;
					const hoursLeft = Math.floor(code.secondsLeft / 60 / 60) % 24;
					const daysLeft = Math.floor(code.secondsLeft / 60 / 60 / 24) % 7;
					const weeksLeft = Math.floor(code.secondsLeft / 60 / 60 / 24 / 7);
					if (code.code == "SNOWMAN7")
						console.log({ percentageElapsed, totalMilliseconds, totalSeconds, code, now, expirationDate, releaseDate });
					return (
						<li key={code.code} className="my-5">
							<div className="flex justify-between">
								<span className={`${inter.className} text-main-color`}>{code.code}</span>
								<p className="text-[#565656]">Expires on {code.expirationDate}</p>
							</div>
							<div className="flex gap-2 md:gap-3">
								<div className="w-[150px] md:w-[180px] h-[15px] rounded mt-1 bg-stone-300">
									<div
										style={{ width: `${percentageElapsed}%` }}
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
												hoursLeft > 0 ? `${hoursLeft == 1 ? `${hoursLeft} hour and ` : `${hoursLeft} hours and `}` : ""
										  }${minutesLeft == 1 ? `${minutesLeft} minute left` : `${minutesLeft} minutes left`} `
										: code.secondsLeft <= 604800
										? `${daysLeft > 0 ? `${daysLeft == 1 ? `${daysLeft} day and ` : `${daysLeft} days and `}` : ""}${
												hoursLeft % 24 == 1 ? `${hoursLeft % 24} hour left` : `${hoursLeft % 24} hours left`
										  } `
										: `${
												weeksLeft > 0 ? `${weeksLeft == 1 ? `${weeksLeft} week and ` : `${weeksLeft} weeks and `}` : ""
										  }${daysLeft > 0 ? `${daysLeft == 1 ? `${daysLeft} day and ` : `${daysLeft} days left`} ` : ""}
										`}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
