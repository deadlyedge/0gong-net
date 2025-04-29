import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["700"],
})

export const Footer = () => {
	return (
		<footer className="border-t font-medium bg-white">
			<div className="max-w-(--breakpoing-xl) mx-auto flex items-center gap-2 h-full p-4 lg:px-8">
				<p>&copy; 2025. All rights reserved.  Powered by</p>
				<Link href="/">
					<span className={cn("text-2xl font-semibold", poppins.className)}>
						0gong.net
					</span>
				</Link>
			</div>
		</footer>
	)
}
