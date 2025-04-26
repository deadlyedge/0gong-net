import {
	parseAsArrayOf,
	createLoader,
	parseAsString,
	parseAsStringLiteral,
} from "nuqs/server"

export const sortValues = ["featured", "trending", "newest"] as const

const params = {
	sort: parseAsStringLiteral(sortValues).withDefault("featured"),
	minPrice: parseAsString
		.withOptions({
			clearOnDefault: true,
		})
		.withDefault(""),
	maxPrice: parseAsString
		.withOptions({
			clearOnDefault: true,
		})
		.withDefault(""),
	tags: parseAsArrayOf(parseAsString)
		.withOptions({
			clearOnDefault: true,
		})
		.withDefault([]),
}

export const loadProductFilters = createLoader(params)
