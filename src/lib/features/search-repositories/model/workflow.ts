import { Result } from "neverthrow";

import type { UnResultOk } from "$lib/shared";

import {
	asOrderOption,
	asPageOption,
	asPerPageOption,
	asQOption,
	asSortOption,
	searchRepositories,
} from "../api/github";

type ViewPageData =
	| InitialViewPageData
	| ResultViewPageData
	| ErrorViewPageData;

type InitialViewPageData = {
	type: "initial";
	q: string;
};

type ResultViewPageData = {
	type: "result";
	value: SearchRepositoriesReturn;
	q: string;
};

type SearchRepositoriesReturn = UnResultOk<
	Awaited<ReturnType<typeof searchRepositories>>
>;

type ErrorViewPageData = {
	type: "error";
	cause: string;
	q: string;
};

export const invokeSearchRepositories = async (
	searchParams: URLSearchParams,
): Promise<ViewPageData> => {
	const q = searchParams.get("q") || undefined;
	const sort = searchParams.get("sort") || undefined;
	const order = searchParams.get("order") || undefined;
	const per_page = searchParams.get("per_page") || undefined;
	const page = searchParams.get("page") || undefined;

	if (!q) {
		return {
			type: "initial",
			q: "",
		} satisfies InitialViewPageData;
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
				} satisfies ResultViewPageData;
			},
			(error) => {
				return {
					type: "error",
					cause: error.message,
					q,
				} satisfies ErrorViewPageData;
			},
		);
};
