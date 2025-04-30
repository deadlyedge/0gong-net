import { isSuperAdmin } from "@/lib/access"
import type { CollectionConfig } from "payload"

export const Tenants: CollectionConfig = {
	slug: "tenants",
	access: {
		create: ({ req }) => isSuperAdmin(req.user),
		delete: ({ req }) => isSuperAdmin(req.user),
	},
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
			access: {
				update: ({ req }) => isSuperAdmin(req.user),
			},
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
			access: {
				update: ({ req }) => isSuperAdmin(req.user),
			},
			admin: {
				description: "The Stripe account ID for this tenant",
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
