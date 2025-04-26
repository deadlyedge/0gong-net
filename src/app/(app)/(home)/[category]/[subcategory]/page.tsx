type PageProps = {
	params: Promise<{
		category: string
		subcategory: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { category, subcategory } = await params
	return (
		<div>
			Category {category},{subcategory} Page
		</div>
	)
}

export default Page
