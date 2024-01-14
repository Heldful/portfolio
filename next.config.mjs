import { withContentlayer } from "next-contentlayer";
import getWithNextIntl from 'next-intl/plugin'

const withNextIntl = getWithNextIntl()

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		mdxRs: true,
	},
};

export default withNextIntl(withContentlayer(nextConfig));
