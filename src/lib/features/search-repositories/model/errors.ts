import { errorWithCause } from "$lib/shared";

export class SearchRepositoriesApiError extends Error {
	name = "SearchRepositoriesApiError";
}

export const toSearchRepositoriesApiError = errorWithCause(
	SearchRepositoriesApiError,
);
