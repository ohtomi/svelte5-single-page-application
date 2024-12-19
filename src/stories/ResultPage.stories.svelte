<script module lang="ts">
import { defineMeta } from "@storybook/addon-svelte-csf";
import { expect, userEvent, within } from "@storybook/test";

import { ResultPage } from "$lib/pages/result";

import { makeGotoDummy } from "./dummies";

const { Story } = defineMeta({
	title: "ページ/検索結果",
	component: ResultPage,
	parameters: {
		layout: "fullscreen",
		sveltekit_experimental: {
			navigation: {
				goto: makeGotoDummy(),
			},
		},
	},
});

const repositories = [
	{
		fullName: "sveltejs/svelte",
		description: "web development for the rest of us",
		createdAt: "2016-11-20T18:13:05Z",
		updatedAt: "2024-12-14T07:25:08Z",
		pushedAt: "2024-12-13T16:18:34Z",
		htmlUrl: "https://github.com/sveltejs/svelte",
		watchersCount: 80468,
		stargazersCount: 80468,
		forksCount: 4300,
		hasIssues: true,
		hasWiki: true,
	},
	{
		fullName: "rob-balfre/svelte-select",
		description: "Svelte Select. A select component for Svelte",
		createdAt: "2018-12-10T23:24:07Z",
		updatedAt: "2024-12-13T15:22:49Z",
		pushedAt: "2024-10-20T20:42:55Z",
		htmlUrl: "https://github.com/rob-balfre/svelte-select",
		watchersCount: 1286,
		stargazersCount: 1286,
		forksCount: 187,
		hasIssues: true,
		hasWiki: false,
	},
	{
		fullName: "hperrin/svelte-material-ui",
		description: "Svelte Material UI Components",
		createdAt: "2019-07-17T00:36:53Z",
		updatedAt: "2024-12-13T11:54:36Z",
		pushedAt: "2024-12-13T01:42:01Z",
		htmlUrl: "https://github.com/hperrin/svelte-material-ui",
		watchersCount: 3332,
		stargazersCount: 3332,
		forksCount: 286,
		hasIssues: true,
		hasWiki: true,
	},
];

const options = {
	q: "svelte",
	sort: undefined,
	order: undefined,
	per_page: undefined,
	page: 1,
};

const result = {
	totalCount: 73189,
	repositories,
	options,
};
</script>

<Story name="初期表示"
       args={{ value: result, q: options.q }}
       play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const totalCount = canvas.getByText("73,189 repositories");
    await expect(totalCount).toBeInTheDocument();
    const repositoryFullName = canvas.getByText("sveltejs/svelte");
    await expect(repositoryFullName).toBeInTheDocument();
    const currentPage = canvas.getByRole("link", { current: "page" });
    await expect(currentPage).toBeInTheDocument();
    await expect(currentPage).toHaveTextContent("1");
  }}
/>

<Story name="キーワード検索/ボタンクリック"
       args={{ value: result, q: options.q }}
       play={async ({ canvasElement, parameters: { sveltekit_experimental: { navigation: { goto } } } }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search keyword");
    await expect(searchInput).toBeInTheDocument();
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, "jquery");
    await userEvent.keyboard("{enter}");

    await expect(goto?.spy?.[0]?.parameters?.[0]).toBe("/?q=jquery");
  }}
/>

<Story name="キーワード検索/エンター入力"
       args={{ value: result, q: options.q }}
       play={async ({ canvasElement, parameters: { sveltekit_experimental: { navigation: { goto } } } }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search keyword");
    await expect(searchInput).toBeInTheDocument();
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, "jquery");
    const searchButton = canvas.getByRole("button", { name: /Search/i });
    await userEvent.click(searchButton);

    await expect(goto?.spy?.[0]?.parameters?.[0]).toBe("/?q=jquery");
  }}
/>
