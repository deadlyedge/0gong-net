import type { CollectionConfig } from "payload"
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields"

const defaultTenantArrayField = tenantsArrayField({
	tenantsArrayFieldName: "tenants",
	tenantsCollectionSlug: "tenants",
	tenantsArrayTenantFieldName: "tenant",
	arrayFieldAccess: {
		read: () => true,
		create: () => true,
		update: () => true,
	},
	tenantFieldAccess: {
		read: () => true,
		create: () => true,
		update: () => true,
	},
})

export const Users: CollectionConfig = {
	slug: "users",
	admin: {
		useAsTitle: "email",
	},
	auth: true,
	fields: [
		// Email added by default
		// Add more fields as needed
		{
			name: "username",
			type: "text",
			required: true,
			unique: true,
		},
		{
			admin: {
				position: "sidebar",
			},
			name: "roles",
			type: "select",
			hasMany: true,
			defaultValue: ["user"],
			options: [
				{ label: "Super Admin", value: "super-admin" },
				{ label: "User", value: "user" },
			],
		},
		{
			...defaultTenantArrayField,
			admin: {
				...(defaultTenantArrayField.admin || {}),
				position: "sidebar",
			},
		},
	],
}
