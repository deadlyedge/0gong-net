import { Skeleton } from "@/components/ui/skeleton"
import { generateTenantUrl } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

type ProductCardProps = {
	id: string
	name: string
	price: number
	imageUrl?: string | null
	tenantSlug: string
	tenantImageUrl?: string | null
	reviewRating: number
	reviewCount: number
}

export const ProductCard = ({
	id,
	name,
	// price,
	imageUrl,
	tenantSlug,
	tenantImageUrl,
	reviewRating,
	reviewCount,
}: ProductCardProps) => {
	const router = useRouter()

	const handleTenantClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()

		router.push(generateTenantUrl(tenantSlug))
	}
	return (
		<Link prefetch href={`/library/${id}`}>
			<div className="border rounded-md bg-white overflow-hidden h-full flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
				<div className="relative aspect-square">
					<Image
						alt={name}
						src={imageUrl ?? "https://f.zick.xyz/s/AmYuYfCj"}
						fill
						className="object-cover"
					/>
				</div>
				<div className="p-4 flex flex-col flex-1 border-y gap-3">
					<h2 className="text-lg font-semibold line-clamp-4">{name}</h2>
					<div className="flex items-center gap-2" onClick={handleTenantClick}>
						{tenantImageUrl && (
							<Image
								alt={tenantSlug}
								src={tenantImageUrl}
								width={16}
								height={16}
								className="rounded-full border shrink-0 size-[16px]"
							/>
						)}
						<p className="text-sm text-muted-foreground">{tenantSlug}</p>
					</div>
					{reviewCount > 0 && (
						<div className="flex items-center gap-1">
							<StarIcon className="size-3.5 text-yellow-500" />
							<p className="text-sm text-muted-foreground">
								{reviewRating} ({reviewCount})
							</p>
						</div>
					)}
				</div>
				{/* <div className="p-4">
					<div className="relative px-2 py-1 border bg-pink-400 w-fit">
						<p className="text-sm font-medium">{formatCurrency(price)}</p>
					</div>
				</div> */}
			</div>
		</Link>
	)
}

export const ProductCardSkeleton = () => {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton className="aspect-square w-full" />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-1/2" />
			</div>
		</div>
	)
}
