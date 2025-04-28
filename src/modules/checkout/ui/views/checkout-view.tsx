"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { generateTenantUrl } from "@/lib/utils"

import { toast } from "sonner"
import { InboxIcon, LoaderIcon } from "lucide-react"

import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery } from "@tanstack/react-query"

// import { useCartStore } from "../../store/use-cart-store"
import { CheckoutItem } from "../components/checkout-item"
import { CheckoutSidebar } from "../components/checkout-sidebar"
import { useCheckoutStates } from "../../hooks/use-checkout-states"
import { useCart } from "../../hooks/use-cart"

type CheckoutViewProps = {
	tenantSlug: string
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
	const router = useRouter()
	const [states, setStates] = useCheckoutStates()
	// const getCartByTenant = useCartStore((state) => state.getCartByTenant)
	// const removeProduct = useCartStore((state) => state.removeProduct)
	// const clearCart = useCartStore((state) => state.clearCart)

	// const productIds = getCartByTenant(tenantSlug)
	const { productIds, clearCart, removeProduct } = useCart(tenantSlug)

	const trpc = useTRPC()
	const { data, error, isLoading } = useQuery(
		trpc.checkout.getProducts.queryOptions({ ids: productIds }),
	)

	const purchase = useMutation(
		trpc.checkout.purchase.mutationOptions({
			onMutate: () => {
				setStates({ success: false, cancelled: false })
			},
			onSuccess: (data) => {
				setStates({ success: true, cancelled: false })
				clearCart()
				window.location.href = data.url
			},
			onError: (error) => {
				if (error.data?.code === "UNAUTHORIZED") {
					// TODO: modify when subdomains enabled
					router.push("/sign-in")
				}
				toast.error(error.message)
			},
		}),
	)

	useEffect(() => {
		if (states.success) {
			setStates({ success: false, cancelled: false })
			clearCart()
			// TODO: Invalidate library
			router.push("/products")
		}
	}, [states.success, clearCart, router, setStates])

	useEffect(() => {
		if (error?.data?.code === "NOT_FOUND") {
			clearCart()
			toast.warning("Some products are not available anymore")
		}
	}, [error, clearCart])

	if (isLoading) {
		return (
			<div className="pt-4 px-4 lg:pt-16 lg:px-12">
				<div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
					<LoaderIcon className="animate-spin text-muted-foreground" />
				</div>
			</div>
		)
	}

	if (data?.totalDocs === 0) {
		return (
			<div className="pt-4 px-4 lg:pt-16 lg:px-12">
				<div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
					<InboxIcon />
					<p className="text-base font-medium">No products found</p>
				</div>
			</div>
		)
	}

	return (
		<div className="pt-4 px-4 lg:pt-16 lg:px-12">
			<div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
				<div className="lg:col-span-4">
					<div className="border rounded-md overflow-hidden bg-white">
						{data?.docs.map((product, index) => (
							<CheckoutItem
								key={product.id}
								isLast={index === data.docs.length - 1}
								imageUrl={product.image?.url}
								name={product.name}
								productUrl={`/${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
								tenantUrl={generateTenantUrl(product.tenant.slug)}
								tenantName={product.tenant.name}
								price={product.price}
								onRemove={() => removeProduct(product.id)}
							/>
						))}
					</div>
				</div>

				<div className="lg:col-span-3">
					<CheckoutSidebar
						total={data?.totalPrice ?? 0}
						onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
						isCancelled={states.cancelled}
						disabled={purchase.isPending}
					/>
				</div>
			</div>
		</div>
	)
}
