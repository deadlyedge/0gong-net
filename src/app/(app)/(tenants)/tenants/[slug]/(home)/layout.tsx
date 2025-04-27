import { Suspense } from "react"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { Footer } from "@/modules/tenants/ui/components/footer"
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar"

type LayoutProps = {
	children: React.ReactNode
	params: Promise<{ slug: string }>
}

const Layout = async ({ children, params }: LayoutProps) => {
	const { slug } = await params

	const queryClient = getQueryClient()
	void queryClient.prefetchQuery(
		trpc.tenants.getOne.queryOptions({
			slug,
		}),
	)

	return (
		<div className="min-h-screen flex flex-col bg-[#f4f4f0]">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<NavbarSkeleton />}>
					<Navbar slug={slug} />
				</Suspense>
			</HydrationBoundary>
			<div className="flex-1">
				<div className="max-w-(--breakpoing-xl) mx-auto">{children}</div>
			</div>
			<Footer />
		</div>
	)
}

export default Layout
