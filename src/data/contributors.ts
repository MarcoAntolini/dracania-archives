type Role = "Developer" | "Database Contributor" | "Donator" | "Idea Contributor" | "Beta Tester";

const contributors: { name: string; role: Role | Role[] }[] = [
	{
		name: "Cosmaz",
		role: ["Beta Tester", "Idea Contributor"],
	},
	{
		name: "Cezara",
		role: "Database Contributor",
	},
	{
		name: "Shiver",
		role: "Database Contributor",
	},
	{
		name: "Raventz",
		role: "Idea Contributor",
	},
	{
		name: "TheSlifer",
		role: "Idea Contributor",
	},
];

export default contributors;
