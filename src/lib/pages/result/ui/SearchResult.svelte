<script lang="ts">
import type { searchRepositories, UnResultOk } from "$lib/shared";

import TotalCount from "./TotalCount.svelte";
import RepositorySummary from "./RepositorySummary.svelte";
import Pagination from "./Pagination.svelte";

type Props = {
	totalCount: SearchRepositoriesReturn["totalCount"];
	repositories: SearchRepositoriesReturn["repositories"];
	options: SearchRepositoriesReturn["options"];
};

type SearchRepositoriesReturn = UnResultOk<
	Awaited<ReturnType<typeof searchRepositories>>
>;

let { totalCount, repositories, options }: Props = $props();
</script>

<TotalCount {totalCount}/>

{#each repositories as repository (repository.htmlUrl)}
    <RepositorySummary repository={repository}/>
{/each}

<Pagination {totalCount} {options}/>
