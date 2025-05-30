"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react"

import { useProductFilters } from "@/modules/products/hooks/use-product-filters"
import { PriceFilter } from "./price-filter"
import { TagsFilter } from "./tags-filter"

type ProductFilterProps = {
	title: string
	className?: string
	children: React.ReactNode
}

const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon

	return (
		<div className={cn("p-4 border-b flex flex-col gap-2", className)}>
			<div
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center justify-between cursor-pointer">
				<p className="font-medium">{title}</p>
				<Icon className="size-5" />
			</div>
			{isOpen && children}
		</div>
	)
}

export const ProductFilters = () => {
	const [filters, setFilters] = useProductFilters()

	// xdream edited this line
	// const hasAnyFilters = Object.values(filters).some((value) => {
	// 	return typeof value === "string" ? value !== "" : value && value.length > 0
	// })

	const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
		if (key === "sort") return false

		if (typeof value === "string") {
			return value !== ""
		}
		if (Array.isArray(value)) {
			return value.length > 0
		}
		return false
	})

	const onClear = () => {
		setFilters({
			minPrice: "",
			maxPrice: "",
			tags: [],
		})
	}

	const onChange = (key: keyof typeof filters, value: unknown) => {
		setFilters({ ...filters, [key]: value })
		// console.log(filters)
	}
	return (
		<div className="border rounded-md bg-white">
			<div className="p-4 border-b flex items-center justify-between">
				<p className="font-medium">Filters</p>
				{hasAnyFilters && (
					<button
						className="underline cursor-pointer"
						onClick={onClear}
						type="button">
						Clear
					</button>
				)}
			</div>
			<ProductFilter title="Price">
				<PriceFilter
					minPrice={filters.minPrice}
					maxPrice={filters.maxPrice}
					onMinPriceChange={(value) => onChange("minPrice", value)}
					onMaxPriceChange={(value) => onChange("maxPrice", value)}
				/>
			</ProductFilter>
			<ProductFilter title="Tags" className="border-b-0">
				<TagsFilter
					value={filters.tags}
					onChange={(value) => onChange("tags", value)}
				/>
			</ProductFilter>
		</div>
	)
}
