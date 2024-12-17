import { delay, http, HttpResponse } from "msw";
import type { request } from "@octokit/request";

import { repositories } from "$lib/shared/api/mocks/fixtures";

const endpoint = "https://api.github.com/search/repositories";

type SearchRepositoriesReturn = Awaited<
	ReturnType<typeof request<"GET /search/repositories">>
>;

type SearchRepositoriesResponse = SearchRepositoriesReturn["data"];
type SearchRepositoriesResponseItems = SearchRepositoriesResponse["items"];

const response: SearchRepositoriesResponse = {
	total_count: 73189,
	incomplete_results: false,
	items: repositories satisfies SearchRepositoriesResponseItems,
};

export const ok200 = http.get(endpoint, () => {
	return HttpResponse.json(response);
});

export const ng401 = http.get(endpoint, () => {
	return new HttpResponse(null, { status: 401 });
});

export const slowOk200 = http.get(endpoint, async () => {
	await delay("infinite");
	return HttpResponse.json(response);
});
