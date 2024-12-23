<script module lang="ts">
import { defineMeta } from "@storybook/addon-svelte-csf";
import { expect, userEvent, within } from "@storybook/test";

import { ErrorPage } from "$lib/pages/error";

import { makeGotoDummy } from "./dummies";

const { Story } = defineMeta({
	title: "ページ/エラー",
	component: ErrorPage,
	parameters: {
		layout: "fullscreen",
		sveltekit_experimental: {
			navigation: {
				goto: makeGotoDummy(),
			},
		},
	},
});
</script>

<Story name="初期表示"
       args={{ cause: "エラーメッセージです" }}
       play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByText("エラーメッセージです");
    await expect(errorMessage).toBeInTheDocument();
  }}
/>

<Story name="キーワード検索/ボタンクリック"
       args={{ cause: "エラーメッセージです" }}
       play={async ({ canvasElement, parameters: { sveltekit_experimental: { navigation: { goto } } } }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search keyword");
    await expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, "svelte");
    const searchButton = canvas.getByRole("button", { name: /Search/i });
    await userEvent.click(searchButton);

    await expect(goto?.spy?.[0]?.parameters?.[0]).toBe("/?q=svelte");
  }}
/>

<Story name="キーワード検索/エンター入力"
       args={{ cause: "エラーメッセージです" }}
       play={async ({ canvasElement, parameters: { sveltekit_experimental: { navigation: { goto } } } }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search keyword");
    await expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, "svelte");
    await userEvent.keyboard("{enter}");

    await expect(goto?.spy?.[0]?.parameters?.[0]).toBe("/?q=svelte");
  }}
/>
