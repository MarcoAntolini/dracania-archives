import { readFile } from "fs/promises";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

async function loadEnvFile() {
	try {
		const envPath = path.join(process.cwd(), ".env.local");
		const contents = await readFile(envPath, "utf8");

		for (const line of contents.split("\n")) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith("#")) continue;

			const separatorIndex = trimmed.indexOf("=");
			if (separatorIndex === -1) continue;

			const key = trimmed.slice(0, separatorIndex).trim();
			const value = trimmed.slice(separatorIndex + 1).trim();

			if (!process.env[key]) {
				process.env[key] = value;
			}
		}
	} catch {
		// .env.local is optional when env vars are already set.
	}
}

await loadEnvFile();

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
	console.error("NEXT_PUBLIC_CONVEX_URL is required.");
	process.exit(1);
}

const outputDir = path.join(process.cwd(), "src/data/static-fallback");

async function convexQuery(functionPath, args = {}) {
	const response = await fetch(`${convexUrl}/api/query`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			path: functionPath,
			args,
			format: "json",
		}),
	});

	if (!response.ok) {
		throw new Error(`Convex query failed for ${functionPath}: ${response.status} ${await response.text()}`);
	}

	const payload = await response.json();
	return payload.value;
}

async function main() {
	await mkdir(outputDir, { recursive: true });

	const [items, sets] = await Promise.all([
		convexQuery("queries/items:getAllItems"),
		convexQuery("queries/sets:getAllSets"),
	]);

	const approvedItems = items.filter((item) => item.contributionStatus === "approved");
	const approvedSets = sets.filter((set) => set.contributionStatus === "approved");

	await Promise.all([
		writeFile(path.join(outputDir, "items.json"), JSON.stringify(approvedItems, null, 2)),
		writeFile(path.join(outputDir, "sets.json"), JSON.stringify(approvedSets, null, 2)),
		writeFile(
			path.join(outputDir, "manifest.json"),
			JSON.stringify(
				{
					exportedAt: new Date().toISOString(),
					source: convexUrl,
					counts: {
						items: approvedItems.length,
						sets: approvedSets.length,
					},
				},
				null,
				2,
			),
		),
	]);

	console.log(`Exported ${approvedItems.length} items and ${approvedSets.length} sets to ${outputDir}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
