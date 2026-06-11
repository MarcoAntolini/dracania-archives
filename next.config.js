const fs = require("fs");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		const vercelFlagsDefinitionsPath = path.join(__dirname, "node_modules", "@vercel", "flags-definitions");

		if (!fs.existsSync(vercelFlagsDefinitionsPath)) {
			config.resolve.alias["@vercel/flags-definitions"] = path.resolve(
				__dirname,
				"src/lib/vercel-flags-definitions-empty.ts",
			);
		}

		config.cache = false;
		return config;
	},
	images: {
		unoptimized: true,
		remotePatterns: [],
	},
};

module.exports = nextConfig;
