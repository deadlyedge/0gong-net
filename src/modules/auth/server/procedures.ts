import { headers as getHeaders, cookies as getCookies } from "next/headers"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"
import { TRPCError } from "@trpc/server"

import { AUTH_COOKIE } from "../constants"
import { loginSchema, registerSchema } from "../schemas"

export const authRouter = createTRPCRouter({
	session: baseProcedure.query(async ({ ctx }) => {
		const headers = await getHeaders()

		const session = await ctx.db.auth({ headers })

		return session
	}),
	logout: baseProcedure.mutation(async () => {
		const cookies = await getCookies()
		cookies.delete(AUTH_COOKIE)
	}),
	login: baseProcedure
		.input(loginSchema)
		.mutation(async ({ ctx, input }) => {
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

			const cookies = await getCookies()
			cookies.set({
				name: AUTH_COOKIE,
				value: user.token,
				httpOnly: true,
				path: "/",
				maxAge: 60 * 60 * 24 * 30, // 30 days
				// TODO: ensure cross-domain cookie sharing
				// domain: "0gong.net" and "antonio.0gong.net"
				// should be able to share the same cookie
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

			const cookies = await getCookies()
			cookies.set({
				name: AUTH_COOKIE,
				value: user.token,
				httpOnly: true,
				path: "/",
				maxAge: 60 * 60 * 24 * 30, // 30 days
				// TODO: ensure cross-domain cookie sharing
				// domain: "0gong.net" and "antonio.0gong.net"
				// should be able to share the same cookie
			})
			return user
		}),
})
