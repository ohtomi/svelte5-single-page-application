<script lang="ts">
import { SiteHeader } from "$lib/widgets/site-header";
import { SearchForm } from "$lib/widgets/search-form";
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

<SearchForm {q}/>

<ErrorMessage {cause}/>
