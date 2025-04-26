type PageProps = { params: Promise<{ category: string }> }

const Page = async ({ params }: PageProps) => {
	const { category } = await params
	return <div>Category {category} Page</div>
}

export default Page
