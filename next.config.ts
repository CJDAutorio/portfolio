import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["three"],
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "my-blob-store.public.blob.vercel-storage.com",
				port: "",
			},
		],
	},
};

export default nextConfig;
