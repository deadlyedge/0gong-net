import { useCart } from "@/modules/checkout/hooks/use-cart"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CartButtonProps = {
	tenantSlug: string
	productId: string
}

export const CartButton = ({ tenantSlug, productId }: CartButtonProps) => {
	const { isProductInCart, toggleProduct } = useCart(tenantSlug)

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
