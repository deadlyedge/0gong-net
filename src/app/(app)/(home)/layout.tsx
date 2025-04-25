import configPromise from "@payload-config"
import { getPayload } from "payload"
import type { Category } from "@/payload-types"

import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { SearchFilters } from "./search-filters"
import type { CustomCategory } from "./types"

type LayoutProps = {
	children: React.ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
	const payload = await getPayload({ config: configPromise })
	const data = await payload.find({
		collection: "categories",
		depth: 1, // Populating subcategories
		pagination: false,
		where: {
			parent: {
				exists: false,
			},
		},
		sort: "name",
	})

	const formattedData: CustomCategory[] = data.docs.map((doc) => ({
		...doc,
		subcategories: (doc.subcategories?.docs ?? []).map((subcategory) => ({
			// Because of 'depth: 1'
			...(subcategory as Category),
			subcategories: undefined,
		})),
	}))
	// console.log(data)

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<SearchFilters data={formattedData} />
			<div className="flex-1 bg-[#f4f4f0]">{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
