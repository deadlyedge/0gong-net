import Link from "next/link"
import { useCart } from "@/modules/checkout/hooks/use-cart"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CartButtonProps = {
	tenantSlug: string
	productId: string
	isPurchased?: boolean
}

export const CartButton = ({
	tenantSlug,
	productId,
	isPurchased,
}: CartButtonProps) => {
	const { isProductInCart, toggleProduct } = useCart(tenantSlug)

	if (isPurchased) {
		return (
			<Button
				variant="elevated"
				asChild
				className="flex-1 font-medium bg-white">
				<Link prefetch href={`/library/${productId}`}>
					View in Library
				</Link>
			</Button>
		)
	}

	return (
		<Button
			variant="elevated"
			className={cn(
				"flex-1 bg-pink-400",
				isProductInCart(productId) && "bg-white",
			)}
			onClick={() => toggleProduct(productId)}>
			{isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
		</Button>
	)
}
