type Role = "Developer" | "Database Contributor" | "Donator" | "New Features Suggestor" | "Tester";

const contributors: { name: string; role: Role | Role[] }[] = [];

export default contributors;
