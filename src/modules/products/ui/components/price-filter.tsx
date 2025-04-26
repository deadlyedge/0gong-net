"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent } from "react"

type PriceFilterProps = {
	minPrice?: string | null
	maxPrice?: string | null
	onMinPriceChange: (value: string) => void
	onMaxPriceChange: (value: string) => void
}

export const formatAsCurrency = (value: string) => {
	const numericValue = value.replace(/[^0-9.]/g, "")

	const parts = numericValue.split(".")
	const formattedValue =
		parts[0] + (parts.length > 1 ? `.${parts[1]?.slice(0, 2)}` : "")

	if (!formattedValue) return ""

	const numberValue = Number.parseFloat(formattedValue)
	if (Number.isNaN(numberValue)) return ""

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(numberValue)
}

export const PriceFilter = ({
	minPrice,
	maxPrice,
	onMinPriceChange,
	onMaxPriceChange,
}: PriceFilterProps) => {
	const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/[^0-9.]/g, "")
		onMinPriceChange(numericValue)
	}
	const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/[^0-9.]/g, "")
		onMaxPriceChange(numericValue)
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-2">
				<Label className="font-medium text-base">Minimum Price</Label>
				<Input
					type="text"
					placeholder="$0"
					value={minPrice ? formatAsCurrency(minPrice) : ""}
					onChange={handleMinPriceChange}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label className="font-medium text-base">Maximum Price</Label>
				<Input
					type="text"
					placeholder="∞"
					value={maxPrice ? formatAsCurrency(maxPrice) : ""}
					onChange={handleMaxPriceChange}
				/>
			</div>

			{/* <div className="flex items-center gap-2">
				<input
					type="text"
					placeholder="Min"
					value={minPrice ?? ""}
					onChange={(e) => onMinPriceChange(e.target.value)}
					className="border rounded-md p-2 w-full"
				/>
				<span>-</span>
				<input
					type="text"
					placeholder="Max"
					value={maxPrice ?? ""}
					onChange={(e) => onMaxPriceChange(e.target.value)}
					className="border rounded-md p-2 w-full"
				/>
			</div> */}
		</div>
	)
}

export const PriceFilterSkeleton = () => {
	return <div>Loading...</div>
}
