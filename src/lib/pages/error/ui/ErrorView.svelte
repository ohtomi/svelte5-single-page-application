<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher } from "$lib/widgets/searcher";

import ErrorMessage from "./ErrorMessage.svelte";

type Props = {
	cause: string;
	q: string;
};

let { cause, q }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q}/>

<ErrorMessage {cause}/>
