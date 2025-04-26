import { headers as getHeaders } from "next/headers"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"
import { TRPCError } from "@trpc/server"

import { loginSchema, registerSchema } from "../schemas"
import { generateAuthCookie } from "../utils"

export const authRouter = createTRPCRouter({
	session: baseProcedure.query(async ({ ctx }) => {
		const headers = await getHeaders()

		const session = await ctx.db.auth({ headers })

		return session
	}),
	login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
		const { email, password } = input
		const user = await ctx.db.login({
			collection: "users",
			data: {
				email,
				password, // this will be hashed automatically
			},
		})

		if (!user.token) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Invalid email or password",
			})
		}

		await generateAuthCookie({
			prefix: ctx.db.config.cookiePrefix,
			value: user.token,
		})

		return user
	}),
	register: baseProcedure
		.input(registerSchema)
		.mutation(async ({ ctx, input }) => {
			const { email, password, username } = input
			const existingData = await ctx.db.find({
				collection: "users",
				limit: 1,
				where: {
					username: {
						equals: username,
					},
				},
			})

			const existingUser = existingData.docs[0]
			if (existingUser) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "Username already taken",
				})
			}
			await ctx.db.create({
				collection: "users",
				data: {
					email,
					password, // this will be hashed automatically
					username,
				},
			})
			const user = await ctx.db.login({
				collection: "users",
				data: {
					email,
					password, // this will be hashed automatically
				},
			})

			if (!user.token) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "Invalid email or password",
				})
			}

			await generateAuthCookie({
				prefix: ctx.db.config.cookiePrefix,
				value: user.token,
			})

			return user
		}),
})
