<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import type { PageData } from "./$types";
import { encodeSearchParameters } from "$lib/shared";
import { InitialView } from "$lib/pages/initial";
import { ResultView } from "$lib/pages/result";
import { ErrorView } from "$lib/pages/error";

let { data }: { data: PageData } = $props();

let q = $state("");

$effect(() => {
	q = $page.url.searchParams.get("q") || "";
});

const handleSearchClick = (q: string): void => {
	goto(`/${encodeSearchParameters(q)}`);
};
</script>

{#if data.type === 'initial'}
    <InitialView {q} onclick={handleSearchClick}/>
{:else if data.type === 'result'}
    <ResultView value={data.value} {q} onclick={handleSearchClick}/>
{:else if data.type === 'error'}
    <ErrorView cause={data.cause} {q} onclick={handleSearchClick}/>
{/if}
