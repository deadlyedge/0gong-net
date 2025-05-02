import { isSuperAdmin } from "@/lib/access"
import type { Tenant } from "@/payload-types"
import type { CollectionConfig } from "payload"

export const Products: CollectionConfig = {
	slug: "products",
	access: {
		create: ({ req }) => {
			if (isSuperAdmin(req.user)) return true

			const tenant = req.user?.tenants?.[0]?.tenant as Tenant

			return Boolean(tenant?.stripeDetailsSubmitted)
		},
	},
	admin: {
		useAsTitle: "name",
		description: "You must verify your account before you can create products.",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "price",
			type: "number",
			required: true,
			admin: {
				description: "Price in USD",
			},
		},
		{
			name: "description",
			// change to richText
			type: "text",
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "cover",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "category",
			type: "relationship",
			relationTo: "categories",
			hasMany: false,
		},
		{
			name: "tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
		},
		{
			name: "refundPolicy",
			type: "select",
			options: ["30 days", "14 days", "7 days", "3 days", "1 day", "no refund"],
			defaultValue: "3 days",
		},
		{
			name: "content",
			// change to richText
			type: "textarea",
			admin: {
				description:
					"Protected content only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, and bonus materials. Supports Markdown formatting.",
			},
		},
	],
}
