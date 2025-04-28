"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

import { generateTenantUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from "lucide-react"
// import { CheckoutButton } from "@/modules/checkout/ui/components/checkout-button"

const CheckoutButton = dynamic(
	() =>
		import("@/modules/checkout/ui/components/checkout-button").then(
			(mod) => mod.CheckoutButton,
		),
	{
		ssr: false,
		loading: () => (
			<Button disabled className="bg-white">
				<ShoppingCartIcon className="text-black" />
			</Button>
		),
	},
)

type NavbarProps = {
	slug: string
}

export const Navbar = ({ slug }: NavbarProps) => {
	const trpc = useTRPC()
	const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))

	return (
		<nav className="h-20 border-b font-medium bg-white">
			<div className="max-w-(--breakpoing-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-8">
				<Link
					href={generateTenantUrl(slug)}
					className="flex items-center gap-2">
					{data.image?.url && (
						<Image
							src={data.image?.url}
							alt={slug}
							width={32}
							height={32}
							className="rounded-full border shrink-0 size-[32px]"
						/>
					)}
					<p className="text-xl">{data.name}</p>
				</Link>
				<CheckoutButton hideIfEmpty tenantSlug={slug} />
			</div>
		</nav>
	)
}

export const NavbarSkeleton = () => {
	return (
		<nav className="h-20 border-b font-medium bg-white">
			<div className="max-w-(--breakpoing-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-12">
				<div />
				<Button disabled className="bg-white">
					<ShoppingCartIcon className="text-black" />
				</Button>
			</div>
		</nav>
	)
}
