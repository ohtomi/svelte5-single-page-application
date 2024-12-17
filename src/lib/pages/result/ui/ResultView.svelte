<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher } from "$lib/widgets/searcher";
import {
	type ResultViewPageData,
	SearchResult,
} from "$lib/features/search-repositories";

type Props = {
	value: ResultViewPageData["value"];
	q: string;
};

let { value, q }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q}/>

<SearchResult totalCount={value.totalCount} repositories={value.repositories} options={value.options}/>
