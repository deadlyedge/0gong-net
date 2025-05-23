import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { ProductList, ProductListSkeleton } from "../components/product-list"
import { Footer } from "../components/footer"

export const LibraryView = () => {
	return (
		<div className="min-h-screen bg-white">
			<nav className="p-4 bg-[#f4f4f0] w-full border-b">
				<Link prefetch href="/" className="flex items-center gap-2">
					<ArrowLeftIcon className="size-4" />
					<span className="text-base font-medium">Continue Shopping</span>
				</Link>
			</nav>
			<header className="bg-[#f4f4f0] py-8 border-b">
				<div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
					<h1 className="text-3xl font-bold">My Library</h1>
					<p className="font-medium text-base">
						Your purchased products and reviews
					</p>
				</div>
			</header>
			<section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
				<Suspense fallback={<ProductListSkeleton />}>
					<ProductList />
				</Suspense>
			</section>
			<Footer />
		</div>
		// <>
		// 	<PageHeader title="Library" />
		// 	<PageContent>
		// 		<PageSection>
		// 			<PageSectionHeader title="My Products" />
		// 			<PageSectionContent>
		// 				<ProductsList />
		// 			</PageSectionContent>
		// 		</PageSection>
		// 	</PageContent>
		// </>
	)
}
