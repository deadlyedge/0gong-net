import Link from "next/link"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

type NavbarItem = {
	href: string
	children: React.ReactNode
}

type NavbarSidebarProps = {
	items: NavbarItem[]
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const NavbarSidebar = ({
	items,
	open,
	onOpenChange,
}: NavbarSidebarProps) => {
	const trpc = useTRPC()
	const session = useQuery(trpc.auth.session.queryOptions())

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="left" className="p-0 transition-none">
				<SheetHeader className="p-4 border-b">
					<SheetTitle>Sidebar</SheetTitle>
				</SheetHeader>
				<ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
					{items.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium"
							onClick={() => onOpenChange(false)}>
							{item.children}
						</Link>
					))}

					{session.data?.user ? (
						<div className="border-t">
							<Link
								href="/admin"
								className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium">
								Dashboard
							</Link>
						</div>
					) : (
						<div className="border-t">
							<Link
								href="/sign-in"
								className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium">
								Log in
							</Link>
							<Link
								href="/sign-up"
								className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium">
								Start selling
							</Link>
						</div>
					)}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
