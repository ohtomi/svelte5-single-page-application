<script lang="ts">
import type { UnResultOk, searchRepositories } from "$lib/shared";
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher } from "$lib/widgets/searcher";

import SearchResult from "./SearchResult.svelte";

type SearchRepositoriesReturn = UnResultOk<
	Awaited<ReturnType<typeof searchRepositories>>
>;

type Props = {
	value: SearchRepositoriesReturn;
	q: string;
};

let { value, q }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q}/>

<SearchResult totalCount={value.totalCount} repositories={value.repositories} options={value.options}/>
