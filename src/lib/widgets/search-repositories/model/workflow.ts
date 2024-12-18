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

type SearchRepositoriesCommand = {
	q: string | null;
	sort: string | null;
	order: string | null;
	per_page: string | null;
	page: string | null;
};

export const invokeSearchRepositories = async (
	command: SearchRepositoriesCommand,
): Promise<SearchRepositoriesInvocation> => {
	const q = command.q || undefined;
	const sort = command.sort || undefined;
	const order = command.order || undefined;
	const per_page = command.per_page || undefined;
	const page = command.page || undefined;

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
