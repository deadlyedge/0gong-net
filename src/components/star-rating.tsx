import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const MAX_RATING = 5
const MIN_RATING = 0
interface StarRatingProps {
	rating: number
	className?: string
	iconClassName?: string
	text?: string
}

export function StarRating({
	rating,
	className,
	iconClassName,
	text,
}: StarRatingProps) {
	const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING, rating))

	return (
		<div className={cn("flex items-center gap-x-1", className)}>
			{Array.from({ length: MAX_RATING }, (_, index) => (
				<StarIcon
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					className={cn(
						"size-4",
						index < safeRating ? "fill-yellow-400" : "",
						iconClassName,
					)}
				/>
			))}
			{text && <p className="text-sm">{text}</p>}
		</div>
	)
}
