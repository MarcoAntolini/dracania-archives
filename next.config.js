/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.cache = false;
		return config;
	},
	images: {
		unoptimized: true,
		remotePatterns: [],
	},
};

module.exports = nextConfig;
