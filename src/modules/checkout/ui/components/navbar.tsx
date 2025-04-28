import Link from "next/link"

import { generateTenantUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NavbarProps = {
	slug: string
}

export const Navbar = ({ slug }: NavbarProps) => {
	return (
		<nav className="h-20 border-b font-medium bg-white">
			<div className="max-w-(--breakpoing-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-8">
				<p className="text-xl">Checkout</p>
				<Button variant="elevated" asChild>
					<Link href={generateTenantUrl(slug)}>Continue Shopping</Link>
				</Button>
			</div>
		</nav>
	)
}
