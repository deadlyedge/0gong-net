import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type TenantCart = {
	productIds: string[]
}

type CartState = {
	tenantCarts: Record<string, TenantCart>
	addProduct: (tenantSlug: string, productId: string) => void
	removeProduct: (tenantSlug: string, productId: string) => void
	clearCart: (tenantSlug: string) => void
	clearAllCarts: () => void
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			tenantCarts: {},
			addProduct: (tenantSlug, productId) =>
				set((state) => ({
					tenantCarts: {
						...state.tenantCarts,
						[tenantSlug]: {
							productIds: [
								...(state.tenantCarts[tenantSlug]?.productIds || []),
								productId,
							],
						},
					},
				})),
			removeProduct: (tenantSlug, productId) =>
				set((state) => ({
					tenantCarts: {
						...state.tenantCarts,
						[tenantSlug]: {
							productIds:
								state.tenantCarts[tenantSlug]?.productIds.filter(
									(id) => id !== productId,
								) || [],
						},
					},
				})),
			clearCart: (tenantSlug) =>
				set((state) => ({
					tenantCarts: {
						...state.tenantCarts,
						[tenantSlug]: {
							productIds: [],
						},
					},
				})),
			clearAllCarts: () => set({ tenantCarts: {} }),
		}),
		{
			name: "0gong-net-cart",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
