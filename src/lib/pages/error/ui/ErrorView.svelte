<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher, type SearcherProps } from "$lib/widgets/searcher";

import ErrorMessage from "./ErrorMessage.svelte";

type Props = {
	cause: string;
} & SearcherProps;

let { cause, q, onclick }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q} {onclick}/>

<ErrorMessage {cause}/>
