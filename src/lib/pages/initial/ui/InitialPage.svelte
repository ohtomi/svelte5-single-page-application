<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher } from "$lib/widgets/searcher";
import { type SearchRepositoriesInitial } from "$lib/widgets/search-repositories";

type Props = {
	q: SearchRepositoriesInitial["q"];
};

let { q }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q}/>
