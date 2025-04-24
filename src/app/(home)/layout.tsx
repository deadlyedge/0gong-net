import { Footer } from "./footer"
import { Navbar } from "./navbar"

type LayoutProps = {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<Navbar />
			<div className="flex-1 bg-[#f4f4f0]">{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
