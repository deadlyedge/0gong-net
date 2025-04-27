import type { Category } from "@/payload-types"
import Link from "next/link"
import type { CategoriesGetManyOutput } from "@/modules/categories/types"

type SubcategoryMenuProps = {
	category: CategoriesGetManyOutput[0]
	isOpen: boolean
}

export const SubcategoryMenu = ({
	category,
	isOpen,
}: SubcategoryMenuProps) => {
	if (!isOpen || !category.subcategories || category.subcategories.length === 0)
		return null

	const backgroundColor = category.color || "#f5f5f5"

	return (
		<div className="absolute z-50" style={{ top: "100%", left: 0 }}>
			{/* Invisible bridge to maintain hover */}
			<div className="h-3 w-60" />
			<div
				style={{ backgroundColor }}
				className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]">
				<div>
					{category.subcategories.map((subcategory: Category) => (
						<Link
							key={subcategory.slug}
							href={`/${category.slug}/${subcategory.slug}`}
							className="w-full text-left p-4 px-8 hover:bg-black hover:text-white flex font-medium justify-start items-center gap-2 underline">
							{subcategory.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
