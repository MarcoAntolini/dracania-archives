type New = {
	title: string;
	date: `${number}-${number}-${number}`;
	changes: string[];
};

const changelog: New[] = [
	{
		title: "Website release",
		date: "2023-12-07",
		changes: ["First release of the website. No items functionality yet."],
	},
	{
		title: "Website rework and new features!",
		date: "2024-10-24",
		changes: [
			"Complete rework of the website UI.",
			"New Active Events page with a calendar view.",
			"New Runes page: all runes added to the database with their effects and rarities.",
			"New Jewels page: all jewels added to the database with their effects and rarities.",
		],
	},
	{
		title: "New Contribute section",
		date: "2024-10-25",
		changes: [
			"New Add Items page: you can now help us by adding items to the database.",
			"New Feedback page with a form to submit your feedback.",
			"New Donate page. You can now donate to support the project!",
		],
	},
];

const orderedChangelog = changelog.sort((a, b) => {
	const dateA = new Date(a.date);
	const dateB = new Date(b.date);
	return dateB.getTime() - dateA.getTime();
});

const news = orderedChangelog.map((n, i) => {
	return {
		...n,
		id: `change-${i}`,
	};
});

export default news;
