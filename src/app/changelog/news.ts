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
];

const orderedChangelog = changelog.sort((a, b) => {
	const dateA = new Date(a.date);
	const dateB = new Date(b.date);
	return dateA.getTime() - dateB.getTime();
});

const news = orderedChangelog.map((n, i) => {
	return {
		...n,
		id: `change-${i}`,
	};
});

export default news;
