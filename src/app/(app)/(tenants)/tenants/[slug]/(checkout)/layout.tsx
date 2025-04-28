
import { Footer } from "@/modules/tenants/ui/components/footer"
import { Navbar } from "@/modules/checkout/ui/components/navbar"

type LayoutProps = {
	children: React.ReactNode
	params: Promise<{ slug: string }>
}

const Layout = async ({ children, params }: LayoutProps) => {
	const { slug } = await params

	return (
		<div className="min-h-screen flex flex-col bg-[#f4f4f0]">
					<Navbar slug={slug} />
			<div className="flex-1">
				<div className="max-w-(--breakpoing-xl) mx-auto">{children}</div>
			</div>
			<Footer />
		</div>
	)
}

export default Layout
