import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient, trpc } from "@/trpc/server"
import { Suspense } from "react"

import { Navbar } from "@/modules/home/ui/components/navbar"
import { Footer } from "@/modules/home/ui/components/footer"
import {
	SearchFilters,
	SearchFiltersSkeleton,
} from "@/modules/home/ui/components/search-filters"

type LayoutProps = {
	children: React.ReactNode
}

export const dynamic = 'force-dynamic';

const Layout = async ({ children }: LayoutProps) => {
	const queryClient = getQueryClient()
	void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<SearchFiltersSkeleton />}>
					<SearchFilters />
				</Suspense>
			</HydrationBoundary>
			<div className="flex-1 bg-[#f4f4f0]">{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
