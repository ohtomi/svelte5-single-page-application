<script lang="ts">
import SiteHeader from '$lib/components/SiteHeader.svelte';
import Searcher, { type SearcherProps } from '$lib/components/Searcher.svelte';
import ErrorMessage from '$lib/components/ErrorMessage.svelte';

type Props = {
	cause: string;
} & SearcherProps;

let { cause, q, onclick }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q} {onclick}/>

<ErrorMessage {cause}/>
