import { Result } from "neverthrow";

import type { PageServerLoad } from "./$types";
import type { UnResultOk } from "$lib/shared/model/values";
import {
	asOrderOption,
	asPageOption,
	asPerPageOption,
	asQOption,
	asSortOption,
	searchRepositories,
} from "$lib/shared/api/github";

type ViewPageData =
	| InitialViewPageData
	| ResultViewPageData
	| ErrorViewPageData;

type InitialViewPageData = {
	type: "initial";
};

type ResultViewPageData = {
	type: "result";
	value: SearchResult;
};

type SearchResult = UnResultOk<Awaited<ReturnType<typeof searchRepositories>>>;

type ErrorViewPageData = {
	type: "error";
	cause: string;
};

export const load: PageServerLoad = async ({ url }): Promise<ViewPageData> => {
	const q = url.searchParams.get("q") || undefined;
	const sort = url.searchParams.get("sort") || undefined;
	const order = url.searchParams.get("order") || undefined;
	const per_page = url.searchParams.get("per_page") || undefined;
	const page = url.searchParams.get("page") || undefined;

	if (!q) {
		return {
			type: "initial",
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
				} satisfies ResultViewPageData;
			},
			(error) => {
				return {
					type: "error",
					cause: error.message,
				} satisfies ErrorViewPageData;
			},
		);
};
