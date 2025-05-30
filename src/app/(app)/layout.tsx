import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import { TRPCReactProvider } from "@/trpc/client"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const dmSans = DM_Sans({
	subsets: ["latin"],
	// variable: "--font-dm-sans",
})

export const metadata: Metadata = {
	title: "0gong.net",
	description: "Find your next adventure.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${dmSans.className} antialiased`}>
				<NuqsAdapter>
					<TRPCReactProvider>
						{children}
						<Toaster />
					</TRPCReactProvider>
				</NuqsAdapter>
			</body>
		</html>
	)
}
