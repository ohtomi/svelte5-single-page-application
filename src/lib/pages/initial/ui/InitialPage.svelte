<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { SearchForm } from "$lib/widgets/search-form";
import { type SearchRepositoriesInitial } from "$lib/widgets/search-repositories";

type Props = {
	q: SearchRepositoriesInitial["q"];
};

let { q }: Props = $props();
</script>

<SiteHeader/>

<SearchForm {q}/>
