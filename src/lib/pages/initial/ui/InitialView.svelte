<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher, type SearcherProps } from "$lib/widgets/searcher";

type Props = SearcherProps;

let { q, onclick }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q} {onclick}/>
