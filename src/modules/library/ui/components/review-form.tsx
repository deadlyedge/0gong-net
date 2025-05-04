"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	// FormLabel,
	FormMessage,
} from "@/components/ui/form"

import type { ReviewsGetOneOutput } from "@/modules/reviews/types"
import { StarPicker } from "@/components/star-picker"

type ReviewFormProps = { productId: string; initialData?: ReviewsGetOneOutput }

const formSchema = z.object({
	rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5),
	description: z
		.string()
		.min(3, { message: "Description must be at least 3 characters" }),
})

export const ReviewForm = ({ productId, initialData }: ReviewFormProps) => {
	const [isPreview, setIsPreview] = useState(!!initialData)

	const trpc = useTRPC()
	const queryClient = useQueryClient()

	const createReview = useMutation(
		trpc.reviews.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.reviews.getOne.queryOptions({ productId }),
				)
				setIsPreview(true)
			},
			onError: (error) => {
				toast.error(error.message)
			},
		}),
	)
	const updateReview = useMutation(
		trpc.reviews.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					trpc.reviews.getOne.queryOptions({ productId }),
				)
				setIsPreview(true)
			},
			onError: (error) => {
				toast.error(error.message)
			},
		}),
	)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			rating: initialData?.rating ?? 0,
			description: initialData?.description ?? "",
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (initialData) {
			updateReview.mutate({
				reviewId: initialData.id,
				rating: values.rating,
				description: values.description,
			})
		} else {
			createReview.mutate({
				productId,
				rating: values.rating,
				description: values.description,
			})
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-4">
				<p className="font-medium">
					{isPreview ? "Your rating:" : "Like it? Rate it!"}
				</p>
				<FormField
					control={form.control}
					name="rating"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<StarPicker
									value={field.value}
									onChange={field.onChange}
									disabled={isPreview}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Description</FormLabel> */}
							<FormControl>
								<Textarea
									placeholder="Want to add a description?"
									disabled={isPreview}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{!isPreview && (
					<Button
						type="submit"
						variant="elevated"
						size="lg"
						disabled={createReview.isPending || updateReview.isPending}
						className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit">
						{initialData ? "Update review" : "Post review"}
					</Button>
				)}
			</form>
			{isPreview && (
				<Button
					type="button"
					variant="elevated"
					size="lg"
					className="w-fit mt-4"
					onClick={() => setIsPreview(false)}>
					Edit
				</Button>
			)}
		</Form>
	)
}

export const ReviewSidebarSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-4">
			<p className="font-medium">Like it? Rate it!</p>
			<StarPicker disabled />
			<Textarea placeholder="Want to add a description?" disabled />
			<Button type="button" variant="elevated" size="lg" disabled>
				Post review
			</Button>
		</div>
	)
}
