import { z } from "zod"

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters long")
		.max(63, "Username must be at most 63 characters long")
		.regex(
			/^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
			"Username must be alphanumeric and can contain hyphens",
		)
		.refine(
			(val) => !val.includes("--"),
			"Username cannot contain consecutive hyphens",
		)
		.transform((val) => val.toLowerCase()),
})
