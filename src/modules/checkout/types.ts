import type Stripe from "stripe"

export type ProductMetadata = {
	name: string
	price: number
	id: string
	tenantId: string
	stripeAccountId: string
}

export type CheckoutMetadata = {
	userId: string
}

export type ExpandedLineItem = Stripe.LineItem & {
	price: Stripe.Price & {
		product: Stripe.Product & {
			metadata: ProductMetadata
		}
	}
}
