import { Result } from "neverthrow";

import type { UnResultOk } from "$lib/shared";

import {
	asOrderOption,
	asPageOption,
	asPerPageOption,
	asQOption,
	asSortOption,
	searchRepositories,
} from "../api/search-repositories";

type SearchRepositoriesInvocation =
	| SearchRepositoriesInitial
	| SearchRepositoriesResult
	| SearchRepositoriesError;

export type SearchRepositoriesInitial = {
	type: "initial";
	q: string;
};

export type SearchRepositoriesResult = {
	type: "result";
	value: SearchRepositoriesReturn;
	q: string;
};

type SearchRepositoriesReturn = UnResultOk<
	Awaited<ReturnType<typeof searchRepositories>>
>;

export type SearchRepositoriesError = {
	type: "error";
	cause: string;
	q: string;
};

export const invokeSearchRepositories = async (
	searchParams: URLSearchParams,
): Promise<SearchRepositoriesInvocation> => {
	const q = searchParams.get("q") || undefined;
	const sort = searchParams.get("sort") || undefined;
	const order = searchParams.get("order") || undefined;
	const per_page = searchParams.get("per_page") || undefined;
	const page = searchParams.get("page") || undefined;

	if (!q) {
		return {
			type: "initial",
			q: "",
		} satisfies SearchRepositoriesInitial;
	}

	return Result.combine([
		asQOption(q),
		asSortOption(sort),
		asOrderOption(order),
		asPerPageOption(per_page),
		asPageOption(page),
	])
		.asyncAndThen(([q, sort, order, per_page, page]) =>
			searchRepositories(q, sort, order, per_page, page),
		)
		.match(
			(result) => {
				return {
					type: "result",
					value: result,
					q,
				} satisfies SearchRepositoriesResult;
			},
			(error) => {
				return {
					type: "error",
					cause: error.message,
					q,
				} satisfies SearchRepositoriesError;
			},
		);
};
