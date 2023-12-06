type Role = "Developer" | "Designer" | "Database Contributor";

const contributors: { name: string; role: Role | Role[]; github: `https://github.com/users/${string}` }[] = [];

export default contributors;
