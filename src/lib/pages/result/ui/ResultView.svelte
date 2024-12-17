<script lang="ts">
import type { UnResultOk, searchRepositories } from "$lib/shared";
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher, type SearcherProps } from "$lib/widgets/searcher";

import SearchResult from "./SearchResult.svelte";

type Value = UnResultOk<Awaited<ReturnType<typeof searchRepositories>>>;

type Props = {
	value: Value;
} & SearcherProps;

let { value, q, onclick }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q} {onclick}/>

<SearchResult totalCount={value.totalCount} repositories={value.repositories} options={value.options}/>
