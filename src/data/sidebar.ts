import { FaDiscord, FaGithub } from "react-icons/fa";

export const sidebarData = {
	news: [
		{
			title: "Website News",
			url: "/website-news",
			image: "/images/icons/news.png",
		},
		{
			title: "Bonus Codes",
			url: "/codes",
			image: "/images/icons/bonus-code.png",
		},
		{
			title: "Active Events",
			url: "/events",
			image: "/images/icons/event.png",
		},
	],
	database: [
		{
			title: "Items",
			url: "/items",
			image: "/images/icons/items.png",
			isCollapsible: true,
			isActive: true,
			items: [
				{
					title: "Steam Mechanicus",
					url: "/items/steam-mechanicus",
					image: "/images/classes/steam-mechanicus_logo.png",
				},
				{
					title: "Spellweaver",
					url: "/items/spellweaver",
					image: "/images/classes/spellweaver_logo.png",
				},
				{
					title: "Ranger",
					url: "/items/ranger",
					image: "/images/classes/ranger_logo.png",
				},
				{
					title: "Dragonknight",
					url: "/items/dragonknight",
					image: "/images/classes/dragonknight_logo.png",
				},
			],
		},
		{
			title: "Gems",
			url: "/gems",
			image: "/images/icons/gem.png",
		},
		{
			title: "Runes",
			url: "/runes",
			image: "/images/icons/rune.png",
		},
		{
			title: "Jewels",
			url: "/jewels",
			image: "/images/icons/jewel.png",
		},
		{
			title: "Dragonstones",
			url: "/dragonstones",
			image: "/images/icons/dragonstone.png",
			isDisabled: true,
		},
		{
			title: "Pets",
			url: "/pets",
			image: "/images/icons/pet.png",
			isDisabled: true,
		},
	],
	tools: [
		{ title: "Work in progress...", isDisabled: true },
		// {
		// 	title: "Build Planner",
		// 	url: "#",
		// 	image: "/images/icons/build-planner.png",
		// },
		// {
		// 	title: "Calculators",
		// 	url: "#",
		// 	image: "/images/icons/calculators.png",
		// 	isCollapsible: true,
		// 	isActive: true,
		// 	items: [],
		// },
	],
	contribute: [
		{
			title: "Add Items",
			url: "/add-items",
			image: "/images/icons/contribute.png",
		},
		{
			title: "Donations",
			url: "/donate",
			image: "/images/icons/donate.png",
		},
		{
			title: "Feedback",
			url: "/feedback",
			image: "/images/icons/feedback.png",
		},
	],
	project: [
		{
			title: "About the Project",
			url: "/about",
			image: "/images/icons/about.png",
		},
	],
	community: [
		{
			title: "Discord Server",
			url: "https://discord.com/invite/cRc47h7Drh",
			icon: FaDiscord,
		},
		{
			title: "GitHub Repository",
			url: "https://github.com/MarcoAntolini/dracania-archives",
			icon: FaGithub,
		},
	],
};
