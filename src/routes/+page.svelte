<script lang="ts">
import type { PageData } from "./$types";
import { InitialPage } from "$lib/pages/initial";
import { ResultPage } from "$lib/pages/result";
import { ErrorPage } from "$lib/pages/error";

let { data }: { data: PageData } = $props();
</script>

{#if data.type === 'initial'}
    <InitialPage q={data.q}/>
{:else if data.type === 'result'}
    <ResultPage value={data.value} q={data.q}/>
{:else if data.type === 'error'}
    <ErrorPage cause={data.cause} q={data.q}/>
{/if}
