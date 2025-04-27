import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "f.zick.xyz",
				port: "",
				pathname: "/s/**",
			},
		],
	},
}

export default withPayload(nextConfig)
