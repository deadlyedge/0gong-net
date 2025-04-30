import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"

export const reviewsRouter = createTRPCRouter({
	getOne: protectedProcedure
		.input(
			z.object({
				productId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const product = await ctx.db.findByID({
				collection: "products",
				id: input.productId,
			})

			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				})
			}

			const reviewsData = await ctx.db.find({
				collection: "reviews",
				limit: 1,
				where: {
					and: [
						{ product: { equals: product.id } },
						{ user: { equals: ctx.session.user.id } },
					],
				},
			})

			const review = reviewsData.docs[0]

			if (!review) {
				return null
			}

			return review
		}),
	create: protectedProcedure
		.input(
			z.object({
				productId: z.string(),
				rating: z.number().min(1, "Rating must be at least 1").max(5),
				description: z.string().min(3, "Description is required"),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const product = await ctx.db.findByID({
				collection: "products",
				id: input.productId,
			})

			if (!product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				})
			}

			const existReviewsData = await ctx.db.find({
				collection: "reviews",
				where: {
					and: [
						{ product: { equals: product.id } },
						{ user: { equals: ctx.session.user.id } },
					],
				},
			})

			if (existReviewsData.docs.length > 0) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "You have already reviewed this product",
				})
			}

			const review = await ctx.db.create({
				collection: "reviews",
				data: {
					product: product.id,
					user: ctx.session.user.id,
					rating: input.rating,
					description: input.description,
				},
			})

			return review
		}),
	update: protectedProcedure
		.input(
			z.object({
				reviewId: z.string(),
				rating: z.number().min(1, "Rating must be at least 1").max(5),
				description: z.string().min(3, "Description is required"),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const existReview = await ctx.db.findByID({
				collection: "reviews",
				depth: 0,
				id: input.reviewId,
			})

			if (!existReview) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Review not found",
				})
			}

			if (existReview.user !== ctx.session.user.id) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You are not authorized to update this review",
				})
			}

			const updatedReview = await ctx.db.update({
				collection: "reviews",
				id: input.reviewId,
				data: {
					rating: input.rating,
					description: input.description,
				},
			})

			return updatedReview
		}),
})
