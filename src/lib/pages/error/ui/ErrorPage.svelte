<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher } from "$lib/widgets/searcher";
import {
	ErrorMessage,
	type SearchRepositoriesError,
} from "$lib/widgets/search-repositories";

type Props = {
	cause: SearchRepositoriesError["cause"];
	q: SearchRepositoriesError["q"];
};

let { cause, q }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q}/>

<ErrorMessage {cause}/>
