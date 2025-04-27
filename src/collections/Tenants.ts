import type { CollectionConfig } from "payload"

export const Tenants: CollectionConfig = {
	slug: "tenants",
	admin: {
		useAsTitle: "slug",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			label: "Store Name",
			admin: {
				description: "The name of the store (e.g. '暖暖小馆')",
			},
		},
		{
			name: "slug",
			type: "text",
			required: true,
			index: true,
			unique: true,
			admin: {
				description:
					"This is the subdomain for the store (e.g. 'nuanuan.0gong.net')",
			},
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "stripeAccountId",
			type: "text",
			required: true,
			admin: {
				readOnly: true,
			},
		},
		{
			name: "stripeDetailsSubmitted",
			type: "checkbox",
			admin: {
				readOnly: true,
				description: "Has the tenant submitted their Stripe details?",
			},
		},
	],
}
