"use client";

import Separator from "@/components/Separator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navbarLinks: {
	name: string;
	href: `/${string}`;
}[] = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Items",
		href: "/items",
	},
	{
		name: "About",
		href: "/about",
	},
];

export default function Navbar() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const iconsRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleDocumentClick = (event: MouseEvent | Event) => {
			if (
				(event instanceof MouseEvent &&
					menuRef.current &&
					!menuRef.current.contains(event.target as Node) &&
					iconsRef.current &&
					!iconsRef.current.contains(event.target as Node)) ||
				(event instanceof Event && isMenuVisible && event.type === "scroll")
			) {
				setIsMenuVisible(false);
			}
		};
		if (isMenuVisible) {
			document.addEventListener("click", handleDocumentClick);
			document.addEventListener("scroll", handleDocumentClick);
		}
		return () => {
			document.removeEventListener("click", handleDocumentClick);
			document.removeEventListener("scroll", handleDocumentClick);
		};
	}, [isMenuVisible]);

	return (
		<nav className="menu bg-dark fixed start-0 top-0 z-20 w-full max-w-full">
			<div className="max-w-screen flex flex-wrap items-center justify-center p-3">
				<div className="mr-auto">
					<Link
						href="/"
						className="mr-auto flex items-center space-x-3 rtl:space-x-reverse"
						onClick={() => setIsMenuVisible(false)}
					>
						<Image src="/images/website-logo.png" alt="Dracania Archives logo" width={50} height={50} />
						<span className="self-center whitespace-nowrap text-2xl font-semibold text-white">Dracania Archives</span>
					</Link>
				</div>
				<div className="flex space-x-3 rtl:space-x-reverse md:order-2 md:hidden md:space-x-0">
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						onClick={() => setIsMenuVisible(!isMenuVisible)}
						className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#cdb485a2] md:hidden"
						aria-controls="navbar-sticky"
						aria-expanded={isMenuVisible ? "true" : "false"}
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="h-5 w-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
				</div>
				<div
					ref={menuRef}
					className={`w-full items-center justify-between md:absolute md:left-[50%] md:order-1 md:flex md:w-auto md:translate-x-[-50%] ${
						isMenuVisible ? "" : "hidden"
					}`}
					id="navbar-sticky"
				>
					<ul className="md:bg-dark bg-light mt-4 flex flex-col rounded-lg border border-[#cdb485] p-4 font-medium rtl:space-x-reverse md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
						{navbarLinks.map((link) => (
							<li key={link.name}>
								<Link
									href={link.href}
									onClick={() => setIsMenuVisible(false)}
									className="block rounded border-gray-700 px-3 py-2 text-xl text-white hover:bg-[#6B6B6B] hover:text-white md:p-0 md:hover:bg-transparent"
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div
					ref={iconsRef}
					className={`md:order-2 md:ml-auto ${
						isMenuVisible ? "mt-3 flex justify-end" : "hidden"
					} gap-3 md:flex md:justify-end `}
					id="icons"
				>
					<Link href="https://discord.gg/BJ9cdtjBmt" rel="noopener noreferrer" target="_blank">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-brand-discord-filled"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path
								d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"
								strokeWidth="0"
								fill="currentColor"
							/>
						</svg>
					</Link>
					<Link href="https://github.com/MarcoAntolini/dracania-archives" rel="noopener noreferrer" target="_blank">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-brand-github-filled"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path
								d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"
								strokeWidth="0"
								fill="currentColor"
							/>
						</svg>
					</Link>
				</div>
			</div>
			<Separator color="#cdb485" />
		</nav>
	);
}
