import { parseAsBoolean, useQueryStates } from "nuqs"

export const useCheckoutStates = () => {
	return useQueryStates({
		success: parseAsBoolean.withDefault(false).withOptions({
			clearOnDefault: true,
		}),
		cancelled: parseAsBoolean.withDefault(false).withOptions({
			clearOnDefault: true,
		}),
	})
}
