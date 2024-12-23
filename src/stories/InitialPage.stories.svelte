<script module lang="ts">
import { defineMeta } from "@storybook/addon-svelte-csf";
import { expect, userEvent, within } from "@storybook/test";

import { InitialPage } from "$lib/pages/initial";

import { makeGotoDummy } from "./dummies";

const { Story } = defineMeta({
	title: "ページ/インデックス",
	component: InitialPage,
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

<Story name="初期表示"/>

<Story name="キーワード検索/ボタンクリック" play={async ({ canvasElement, parameters: { sveltekit_experimental: { navigation: { goto } } } }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search keyword");
    await expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, "svelte");
    const searchButton = canvas.getByRole("button", { name: /Search/i });
    await userEvent.click(searchButton);

    await expect(goto?.spy?.[0]?.parameters?.[0]).toBe("/?q=svelte");
  }}
/>

<Story name="キーワード検索/エンター入力" play={async ({ canvasElement, parameters: { sveltekit_experimental: { navigation: { goto } } } }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search keyword");
    await expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, "svelte");
    await userEvent.keyboard("{enter}");

    await expect(goto?.spy?.[0]?.parameters?.[0]).toBe("/?q=svelte");
  }}
/>
