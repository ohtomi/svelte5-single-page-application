<script lang="ts">
import SiteHeader from '$lib/components/SiteHeader.svelte';
import Searcher, { type SearcherProps } from '$lib/components/Searcher.svelte';

type Props = SearcherProps;

let { q, onclick }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q} {onclick}/>
