"use client"

import { useState } from "react"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StarPickerProps = {
	value?: number
	onChange?: (value: number) => void
	className?: string
	disabled?: boolean
}

export const StarPicker = ({
	value = 0,
	onChange,
	className,
	disabled,
}: StarPickerProps) => {
	const [hoverValue, setHoverValue] = useState(0)
	return (
		<div
			className={cn(
				"flex items-center",
				disabled && "opacity-50 cursor-not-allowed",
				className,
			)}>
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					type="button"
					key={star}
					disabled={disabled}
					className={cn(
						"p-0.5 hover:scale-110 transition-transform",
						!disabled && "cursor-pointer",
					)}
					onClick={() => onChange?.(star)}
					onMouseEnter={() => setHoverValue(star)}
					onMouseLeave={() => setHoverValue(0)}>
					<StarIcon
						className={cn(
							"size-5",
							(hoverValue || value) >= star
								? "fill-yellow-500 stroke-black"
								: "stroke-black",
						)}
					/>
				</button>
			))}
		</div>
	)
}
