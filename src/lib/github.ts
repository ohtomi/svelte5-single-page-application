import { err, fromPromise, ok, Result, ResultAsync } from 'neverthrow';
import { request } from '@octokit/request';

import {
	type Brand,
	type ExistingValueOf,
	joinAllElements,
	listAllElements,
} from '$lib/values';
import {
	SearchRepositoriesApiError,
	toSearchRepositoriesApiError,
	ValidationError,
} from '$lib/errors';

type SearchResult = {
	totalCount: number;
	repositories: Array<Repository>;
	options: SearchOptions;
};

type Repository = {
	fullName: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	pushedAt: string;
	htmlUrl: string;
	watchersCount: number;
	stargazersCount: number;
	forksCount: number;
	hasIssues: boolean;
	hasWiki: boolean;
};

type SearchOptions = {
	q: QOption;
	sort: SortOption;
	order: OrderOption;
	per_page: PerPageOption;
	page: PageOption;
};

type RequestResponse = Awaited<
	ReturnType<typeof request<'GET /search/repositories'>>
>;
type RequestParameters = Parameters<typeof request<'GET /search/repositories'>>;

type QOption = Brand<ExistingValueOf<RequestParameters[1]>['q'], 'QOption'>;
type SortOption =
	| Brand<ExistingValueOf<RequestParameters[1]>['sort'], 'SortOption'>
	| undefined;
type OrderOption =
	| Brand<ExistingValueOf<RequestParameters[1]>['order'], 'OrderOption'>
	| undefined;
type PerPageOption =
	| Brand<ExistingValueOf<RequestParameters[1]>['per_page'], 'PerPageOption'>
	| undefined;
type PageOption = Brand<
	ExistingValueOf<RequestParameters[1]>['page'],
	'PageOption'
>;

export const asQOption = (v: unknown): Result<QOption, ValidationError> => {
	return typeof v === 'string'
		? ok(v as QOption)
		: err(
				new ValidationError(
					'検索キーワード "q" の値が不正です。文字列を指定してください',
				),
			);
};

export const asSortOption = (
	v: unknown,
): Result<SortOption, ValidationError> => {
	const allSortOptions = listAllElements<
		ExistingValueOf<RequestParameters[1]>['sort']
	>()('stars', 'forks', 'help-wanted-issues', 'updated', undefined);

	return v === undefined
		? ok(v)
		: typeof v === 'string' && allSortOptions.some((option) => option === v)
			? ok(v as SortOption)
			: err(
					new ValidationError(
						`ソートキー "sort" の値が不正です。${joinAllElements(allSortOptions)} のいずれかを指定してください`,
					),
				);
};

export const asOrderOption = (
	v: unknown,
): Result<OrderOption, ValidationError> => {
	const allOrderOptions = listAllElements<
		ExistingValueOf<RequestParameters[1]>['order']
	>()('asc', 'desc', undefined);

	return v === undefined
		? ok(v)
		: typeof v === 'string' && allOrderOptions.some((option) => option === v)
			? ok(v as OrderOption)
			: err(
					new ValidationError(
						`ソート方向 "order" の値が不正です。${joinAllElements(allOrderOptions)} のいずれかを指定してください`,
					),
				);
};

export const asPerPageOption = (
	v: unknown,
): Result<PerPageOption, ValidationError> => {
	const num = Number(v);

	return v === undefined
		? ok(v)
		: Number.isInteger(num) && num > 0
			? ok(num as PerPageOption)
			: err(
					new ValidationError(
						'ページサイズ "per_page" の値が不正です。正の整数を指定してください',
					),
				);
};

export const asPageOption = (
	v: unknown = 1,
): Result<PageOption, ValidationError> => {
	const num = Number(v);

	return Number.isInteger(num) && num > 0
		? ok(num as PageOption)
		: err(
				new ValidationError(
					'ページ数 "page" の値が不正です。正の整数を指定してください',
				),
			);
};

export const searchRepositories = (
	q: QOption,
	sort: SortOption,
	order: OrderOption,
	per_page: PerPageOption,
	page: PageOption,
): ResultAsync<SearchResult, ValidationError | SearchRepositoriesApiError> => {
	return fromPromise(
		trySearchRepositories(q, sort, order, per_page, page),
		toSearchRepositoriesApiError('GitHubリポジトリーを検索できません。'),
	).andThen((response) => {
		const totalCount = response.data.total_count;
		const repositories = response.data.items.map(
			(item) =>
				({
					fullName: item.full_name,
					description: item.description || '',
					createdAt: item.created_at,
					updatedAt: item.updated_at,
					pushedAt: item.pushed_at,
					htmlUrl: item.html_url,
					watchersCount: item.watchers_count,
					stargazersCount: item.stargazers_count,
					forksCount: item.forks_count,
					hasIssues: item.has_issues,
					hasWiki: item.has_wiki,
				}) satisfies Repository,
		);
		const options = { q, sort, order, per_page, page };

		console.warn(options);
		return ok({
			totalCount,
			repositories,
			options,
		});
	});
};

const trySearchRepositories = async (
	q: QOption,
	sort: SortOption,
	order: OrderOption,
	per_page: PerPageOption,
	page: PageOption,
): Promise<RequestResponse> => {
	return await request('GET /search/repositories', {
		q,
		sort,
		order,
		per_page,
		page,
	});
};
