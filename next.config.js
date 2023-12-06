/** @type {import('next').NextConfig} */
const nextConfig = {
	assetPrefix: process.env.NODE_ENV === "production" ? "https://dso-database.marcoantolini.com" : "",
	images: {
		domains: ["dso-database-api.marcoantolini.com"],
	},
};

module.exports = nextConfig;
