<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { SearchForm } from "$lib/widgets/search-form";
import {
	type SearchRepositoriesResult,
	SearchResult,
} from "$lib/widgets/search-repositories";

type Props = {
	value: SearchRepositoriesResult["value"];
	q: SearchRepositoriesResult["q"];
};

let { value, q }: Props = $props();
</script>

<SiteHeader/>

<SearchForm {q}/>

<SearchResult totalCount={value.totalCount} repositories={value.repositories} options={value.options}/>
