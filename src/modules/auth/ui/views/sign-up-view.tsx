"use client"

import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { ArrowRightIcon } from "lucide-react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { registerSchema } from "../../schemas"

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["700"],
})

export const SignUpView = () => {
	const router = useRouter()

	const trpc = useTRPC()
	const queryClient = useQueryClient()

	const register = useMutation(
		trpc.auth.register.mutationOptions({
			onError: (error) => {
				toast.error(error.message)
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
				router.push("/")
				toast.success("Account created successfully")
			},
		}),
	)

	const form = useForm<z.infer<typeof registerSchema>>({
		mode: "onChange",
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			username: "",
		},
	})
	const onSubmit = (values: z.infer<typeof registerSchema>) => {
		register.mutate(values)
	}

	const username = form.watch("username")
	const usernameErrors = form.formState.errors.username

	const showPreview = username && !usernameErrors

	return (
		<div className="grid grid-cols-1 lg:grid-cols-5">
			<div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-8 p-4 lg:p-16">
						<div className="flex items-center justify-between mb-8">
							<Link href="/" className="flex items-center space-x-2">
								{/* <Logo className="w-12 h-12" /> */}
								<span
									className={cn(poppins.className, "text-2xl font-semibold")}>
									0gong.net
								</span>
							</Link>
							<Button
								asChild
								variant="ghost"
								size="sm"
								className="text-base border-none underline">
								<Link href="/sign-in">登录</Link>
							</Button>
						</div>
						<h1 className="text-2xl font-semibold">立即加入并开始赚钱吧！🚀</h1>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">Username</FormLabel>
									<FormControl>
										<Input placeholder="Username" {...field} />
									</FormControl>
									<FormDescription
										className={cn("hidden", showPreview && "block")}>
										Your store will be accessible at{" "}
										<code className="font-semibold">{username}.0gong.net</code>.
										You can change this later.
									</FormDescription>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" {...field} type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-center">
							<p className="text-sm text-gray-500">
								Already have an account?{" "}
								<Link
									prefetch
									href="/sign-in"
									className="text-blue-500 hover:underline">
									Sign in
								</Link>
							</p>
						</div>
						<Button
							disabled={register.isPending}
							type="submit"
							size="lg"
							variant="elevated"
							className="bg-black text-white hover:bg-pink-400 hover:text-primary">
							创建账户
							<ArrowRightIcon className="ml-2 h-4 w-4" />
						</Button>
					</form>
				</Form>
			</div>
			<div
				className="h-screen w-full lg:col-span-2 hidden lg:block"
				style={{
					backgroundImage: "url(/background_people.png)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			{/* <div className="flex flex-col items-center justify-center space-y-4
					<p className="text-sm text-gray-500">
						By signing in, you agree to our{' '}
						<Link href="/terms" className="text-blue-500 hover:underline">
							Terms of Use
						</Link>{' '}
						and{' '}
						<Link href="/privacy" className="text-blue-500 hover:underline">
							Privacy Policy
						</Link>
						.
					</p>
					<p className="text-sm text-gray-500">
						Don&apos;t have an account?{' '}
						<Link href="/sign-up" className="text-blue-500 hover:underline">
							Sign up
						</Link>
					</p>
				</div> */}
		</div>
	)
}
