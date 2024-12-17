<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher } from "$lib/widgets/searcher";
import {
	type SearchRepositoriesResult,
	SearchResult,
} from "$lib/features/search-repositories";

type Props = {
	value: SearchRepositoriesResult["value"];
	q: string;
};

let { value, q }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q}/>

<SearchResult totalCount={value.totalCount} repositories={value.repositories} options={value.options}/>
