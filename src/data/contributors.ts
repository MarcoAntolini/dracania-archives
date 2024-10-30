type Role = "Developer" | "Database Contributor" | "Donator" | "Idea Generator" | "Beta Tester";

const contributors: { name: string; role: Role | Role[] }[] = [
	{
		name: "Cezara",
		role: "Database Contributor",
	},
	{
		name: "Shiver",
		role: "Database Contributor",
	},
];

export default contributors;
