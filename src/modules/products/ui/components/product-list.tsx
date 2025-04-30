"use client"

import { InboxIcon } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"

import { useProductFilters } from "../../hooks/use-product-filters"
import { ProductCard, ProductCardSkeleton } from "./product-card"

import { DEFAULT_LIMIT } from "@/constants"
import { Button } from "@/components/ui/button"

type ProductListProps = {
	category?: string
	tenantSlug?: string
	narrowView?: boolean
}

export const ProductList = ({
	category,
	tenantSlug,
	narrowView,
}: ProductListProps) => {
	const [filters] = useProductFilters()
	const trpc = useTRPC()
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useSuspenseInfiniteQuery(
			trpc.products.getMany.infiniteQueryOptions(
				{
					...filters,
					category,
					tenantSlug,
					limit: DEFAULT_LIMIT,
				},
				{
					getNextPageParam: (lastPage) => {
						return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
					},
				},
			),
		)

	if (data.pages?.[0]?.docs.length === 0) {
		return (
			<div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
				<InboxIcon />
				<p className="text-base font-medium">No products found</p>
			</div>
		)
	}

	return (
		<>
			<div
				className={cn(
					"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
					narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
				)}>
				{data?.pages
					.flatMap((page) => page.docs)
					.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							name={product.name}
							imageUrl={product.image?.url}
							price={product.price}
							tenantSlug={product.tenant.slug}
							tenantImageUrl={product.tenant.image?.url}
							reviewRating={product.averageRating}
							reviewCount={product.reviewCount}
						/>
					))}
			</div>
			<div className="flex justify-center pt-8">
				{hasNextPage && (
					<Button
						disabled={isFetchingNextPage}
						onClick={() => fetchNextPage()}
						className="font-medium disabled:opacity-50 text-base bg-white"
						variant="elevated">
						Load more
					</Button>
				)}
			</div>
		</>
	)
}

export const ProductListSkeleton = ({ narrowView }: ProductListProps) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
				narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3",
			)}>
			{Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<ProductCardSkeleton key={index} />
			))}
		</div>
	)
}
