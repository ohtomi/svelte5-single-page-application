import {
	assert,
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	test,
} from "vitest";
import { Result } from "neverthrow";

import {
	asOrderOption,
	asPageOption,
	asPerPageOption,
	asQOption,
	asSortOption,
	searchRepositories,
} from "$lib/shared/api/github";
import { githubServer } from "$lib/mocks/github";
import { ng401, slowOk200 } from "$lib/mocks/github/search-repositories";
import {
	SearchRepositoriesApiError,
	ValidationError,
} from "$lib/shared/model/errors";

beforeAll(() => githubServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => githubServer.resetHandlers());
afterAll(() => githubServer.close());

const makeRequest = (): ReturnType<typeof searchRepositories> => {
	return Result.combine([
		asQOption("svelte"),
		asSortOption(undefined),
		asOrderOption(undefined),
		asPerPageOption(undefined),
		asPageOption(undefined),
	]).asyncAndThen(([q, sort, order, per_page, page]) => {
		return searchRepositories(q, sort, order, per_page, page);
	});
};

describe("searchRepositories()", () => {
	test("GitHubが 200 OK を返すときはリポジトリー総数と特定ページぶんの詳細情報を返す", async () => {
		expect.assertions(2);

		const got = makeRequest();
		await got.match(
			(r) => {
				expect(r.totalCount).toBe(73189);
				expect(r.repositories).toHaveLength(3);
			},
			(e) => {
				console.error(e);
				assert.fail();
			},
		);
	});

	test("GitHubが 401 Unauthorized を返すときはSearchRepositoriesApiErrorを返す", async () => {
		expect.assertions(1);
		githubServer.use(ng401);

		const got = makeRequest();
		await got.match(
			(r) => {
				console.error(r);
				assert.fail();
			},
			(e) => {
				expect(e).toBeInstanceOf(SearchRepositoriesApiError);
			},
		);
	});

	test(
		"GitHubがなにも返さないときはSearchRepositoriesApiErrorを返す",
		{ timeout: 10000 },
		async () => {
			expect.assertions(1);
			githubServer.use(slowOk200);

			const got = makeRequest();
			await got.match(
				(r) => {
					console.error(r);
					assert.fail();
				},
				(e) => {
					expect(e).toBeInstanceOf(SearchRepositoriesApiError);
				},
			);
		},
	);

	test("引数が不正のときはValidationErrorを返す", async () => {
		expect.assertions(1);

		const got = Result.combine([
			asQOption(null),
			asSortOption(null),
			asOrderOption(null),
			asPerPageOption(null),
			asPageOption(null),
		]).asyncAndThen(([q, sort, order, per_page, page]) => {
			return searchRepositories(q, sort, order, per_page, page);
		});
		await got.match(
			(r) => {
				console.error(r);
				assert.fail();
			},
			(e) => {
				expect(e).toBeInstanceOf(ValidationError);
			},
		);
	});
});
