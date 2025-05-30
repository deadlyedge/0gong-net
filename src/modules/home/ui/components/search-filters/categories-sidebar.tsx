import { useRouter } from "next/navigation"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { useState } from "react"

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import type { CategoriesGetManyOutput } from "@/modules/categories/types"

type CategoriesSidebarProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const CategoriesSidebar = ({
	open,
	onOpenChange,
}: CategoriesSidebarProps) => {
	const router = useRouter()
	const trpc = useTRPC()
	const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

	const [parentCategories, setParentCategories] =
		useState<CategoriesGetManyOutput | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<
		CategoriesGetManyOutput[0] | null
	>(null)

	// if we have parent categories, show those, otherwise show root categories
	const currentCategories = parentCategories ?? data ?? []

	const handleOpenChange = (open: boolean) => {
		setParentCategories(null)
		setSelectedCategory(null)
		onOpenChange(open)
	}

	const handleCategoryClick = (category: CategoriesGetManyOutput[0]) => {
		if (category.subcategories && category.subcategories.length > 0) {
			setParentCategories(category.subcategories as CategoriesGetManyOutput)
			setSelectedCategory(category)
		} else {
			// this is a leaf category (no subcategories)
			if (parentCategories && selectedCategory) {
				// this is a subcategory - navigate to /category/subcategory
				router.push(`/${selectedCategory.slug}/${category.slug}`)
			} else {
				// this is a main category - navigate to /category
				if (category.slug === "all") {
					router.push("/")
				} else {
					router.push(`/${category.slug}`)
				}
			}
			handleOpenChange(false)
		}
	}

	const handleBackClick = () => {
		if (parentCategories) {
			setParentCategories(null)
			setSelectedCategory(null)
		}
	}

	const backgroundColor = selectedCategory?.color || "white"

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent
				side="left"
				className="p-0 transition-none"
				style={{ backgroundColor }}>
				<SheetHeader className="p-4 border-b">
					<SheetTitle>Categories</SheetTitle>
				</SheetHeader>
				<ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
					{parentCategories && (
						<button
							type="button"
							onClick={handleBackClick}
							className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer">
							<ChevronLeftIcon className="size-4 mr-2" />
							Back
						</button>
					)}
					{currentCategories.map((category) => (
						<button
							type="button"
							key={category.slug}
							onClick={() => {
								handleCategoryClick(category)
							}}
							className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer">
							{category.name}
							{category.subcategories && category.subcategories.length > 0 && (
								<ChevronRightIcon className="size-4" />
							)}
						</button>
					))}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
