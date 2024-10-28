/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.cache = false;
		return config;
	},
	images: {
		remotePatterns: [{ protocol: "https", hostname: "api.dracania-archives.com", pathname: "/images/**", port: "" }],
	},
};

module.exports = nextConfig;
