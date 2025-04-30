import type {Stripe} from "stripe"
import { getPayload } from "payload"
import config from "@/payload.config"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import type { ExpandedLineItem } from "@/modules/checkout/types"

export async function POST(req: Request) {
	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(
			await (await req.blob()).text(),
			req.headers.get("stripe-signature") as string,
			process.env.STRIPE_WEBHOOK_SECRET as string,
		)
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error"

		if (error instanceof Error) console.log(`❌ Error.message: ${errorMessage}`)
		return NextResponse.json(
			{ error: `Webhook Error: ${errorMessage}` },
			{ status: 400 },
		)
	}
	console.log("✅ Success:", event.id)

	const permittedEvents: string[] = [
		"checkout.session.completed",
		"account.updated",
	]

	const payload = await getPayload({ config })

	if (permittedEvents.includes(event.type)) {
		let data: Stripe.Checkout.Session

		try {
			switch (event.type) {
				case "checkout.session.completed": {
					data = event.data.object

					if (!data.metadata?.userId) {
						throw new Error("No user ID found in metadata")
					}

					const user = await payload.findByID({
						collection: "users",
						id: data.metadata.userId,
					})

					if (!user) throw new Error("No user found")

					const expandedSession = await stripe.checkout.sessions.retrieve(
						data.id,
						{
							expand: ["line_items.data.price.product"],
						},
					)

					if (
						!expandedSession.line_items?.data ||
						expandedSession.line_items.data.length === 0
					) {
						throw new Error("No line items found")
					}

					const lineItems = expandedSession.line_items
						.data as ExpandedLineItem[]

					for (const item of lineItems) {
						await payload.create({
							collection: "orders",
							data: {
								stripeCheckoutSessionId: data.id,
								user: user.id,
								product: item.price.product.metadata.id,
								name: item.price.product.name,
							},
						})
					}
					break
				}
				case "account.updated": {
					const data = event.data.object as Stripe.Account

					await payload.update({
						collection: "tenants",
						where: {
							stripeAccountId: { equals: data.id },
						},
						data:{
							stripeDetailsSubmitted: data.details_submitted,
						}
					})
					break
				}
				default:
					throw new Error(`Unhandled event: ${event.type}`)
			}
		} catch (error) {
			console.error(error)
			return NextResponse.json(
				{ message: "Webhook handler failed" },
				{ status: 500 },
			)
		}
	}

	return NextResponse.json({ received: true }, { status: 200 })
}
