import type { CollectionConfig } from "payload"

export const Products: CollectionConfig = {
	slug: "products",
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
			type: "text",
		},
		{
			name: "image",
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
			name: "refundPolicy",
			type: "select",
			options: ["30 days", "14 days", "7 days", "3 days", "1 day", "no refund"],
			defaultValue: "3 days",
		},
	],
}
