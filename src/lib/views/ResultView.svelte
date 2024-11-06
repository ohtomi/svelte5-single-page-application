<script lang="ts">
    import type {UnResultOk} from '$lib/values';
    import type {searchRepositories} from '$lib/github';
    import SiteHeader from '$lib/components/SiteHeader.svelte';
    import Searcher, {type SearcherProps} from '$lib/components/Searcher.svelte';
    import SearchResult from '$lib/components/SearchResult.svelte';

    type Value = UnResultOk<Awaited<ReturnType<typeof searchRepositories>>>;

    type Props = {
        value: Value;
    } & SearcherProps;

    let {
        value,
        q,
        onclick,
    }: Props = $props();
</script>

<SiteHeader/>

<Searcher {q} {onclick}/>

<SearchResult totalCount={value.totalCount} repositories={value.repositories} options={value.options}/>
