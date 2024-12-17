<script lang="ts">
import type { PageData } from "./$types";
import { InitialView } from "$lib/pages/initial";
import { ResultView } from "$lib/pages/result";
import { ErrorView } from "$lib/pages/error";

let { data }: { data: PageData } = $props();
</script>

{#if data.type === 'initial'}
    <InitialView q={data.q}/>
{:else if data.type === 'result'}
    <ResultView value={data.value} q={data.q}/>
{:else if data.type === 'error'}
    <ErrorView cause={data.cause} q={data.q}/>
{/if}
