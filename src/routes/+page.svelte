<script lang="ts">
import type { PageData } from "./$types";
import {
	ErrorView,
	InitialView,
	ResultView,
} from "$lib/features/search-repositories";

let { data }: { data: PageData } = $props();
</script>

{#if data.type === 'initial'}
    <InitialView q={data.q}/>
{:else if data.type === 'result'}
    <ResultView value={data.value} q={data.q}/>
{:else if data.type === 'error'}
    <ErrorView cause={data.cause} q={data.q}/>
{/if}
