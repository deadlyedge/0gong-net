import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { CircleXIcon } from "lucide-react"

type CheckoutSidebarProps = {
	total: number
	onCheckout: () => void
	isCancelled?: boolean
	isPending?: boolean
}

export const CheckoutSidebar = ({
	total,
	onCheckout,
	isCancelled,
	isPending,
}: CheckoutSidebarProps) => {
	return (
		<div className="border rounded-md overflow-hidden bg-white flex flex-col">
			<div className="flex justify-between items-center p-4 border-b">
				<h4 className="font-medium text-lg">Total</h4>
				<p className="font-medium text-lg">{formatCurrency(total)}</p>
			</div>
			<div className="p-4 flex items-center justify-center">
				<Button
					variant="elevated"
					size="lg"
					onClick={onCheckout}
					disabled={isCancelled || isPending}
					className="w-full text-base text-white bg-primary hover:bg-pink-400 hover:text-primary">
					Checkout
				</Button>
			</div>
			{isCancelled && (
				<div className="p-4 flex justify-center items-center border-t">
					<div className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded flex items-center w-full">
						<div className="flex items-center">
							<CircleXIcon className="size-6 mr-2 fill-red-500 text-red-100 " />
							<span>Checkout failed. Please try again.</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
