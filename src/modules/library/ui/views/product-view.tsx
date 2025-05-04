"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import {
	defaultJSXConverters,
	RichText,
} from "@payloadcms/richtext-lexical/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

import { Footer } from "../components/footer"
import { ReviewSidebar } from "../components/review-sidebar"
import { Suspense } from "react"
import { ReviewSidebarSkeleton } from "../components/review-form"

type ProductViewProps = {
	productId: string
}

export const ProductView = ({ productId }: ProductViewProps) => {
	const trpc = useTRPC()
	const { data } = useSuspenseQuery(
		trpc.library.getOne.queryOptions({ productId }),
	)

	return (
		<div className="min-h-screen bg-white">
			<nav className="p-4 bg-[#f4f4f0] w-full border-b">
				<Link prefetch href="/library" className="flex items-center gap-2">
					<ArrowLeftIcon className="size-4" />
					<span className="text-base font-medium">Back to Library</span>
				</Link>
			</nav>
			<header className="bg-[#f4f4f0] py-8 border-b">
				<div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
					<h1 className="text-3xl font-bold">{data.name}</h1>
				</div>
			</header>
			<section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
				<div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
					<div className="lg:col-span-2">
						<div className="p-4 bg-white border rounded-md gap-4">
							<Suspense fallback={<ReviewSidebarSkeleton />}>
								<ReviewSidebar productId={productId} />
							</Suspense>
						</div>
					</div>

					<div className="lg:col-span-5">
						{data.content ? (
							<RichText data={data.content} converters={defaultJSXConverters} />
						) : (
							<p className="font-medium italic text-muted-foreground">
								No special content
							</p>
						)}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export const ProductViewSkeleton = () => {
	return (
		<div className="min-h-screen bg-white">
			<nav className="p-4 bg-[#f4f4f0] w-full border-b">
				<div className="flex items-center gap-2">
					<ArrowLeftIcon className="size-4" />
					<span className="text-base font-medium">Back to Library</span>
				</div>
			</nav>
		</div>
	)
}
