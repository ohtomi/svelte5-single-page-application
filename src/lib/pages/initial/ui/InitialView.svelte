<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { Searcher } from "$lib/widgets/searcher";

type Props = {
	q: string;
};

let { q }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q}/>
