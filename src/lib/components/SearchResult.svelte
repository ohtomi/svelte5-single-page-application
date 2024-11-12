<script lang="ts">
import TotalCount, { type TotalCountProps } from './TotalCount.svelte';
import RepositorySummary, {
	type RepositorySummaryProps,
} from './RepositorySummary.svelte';
import Pagination, { type PaginationProps } from './Pagination.svelte';

type Props = {
	totalCount: TotalCountProps['totalCount'];
	repositories: Array<RepositorySummaryProps['repository']>;
	options: PaginationProps['options'];
};

let { totalCount, repositories, options }: Props = $props();
</script>

<TotalCount {totalCount}/>

{#each repositories as repository (repository.htmlUrl)}
    <RepositorySummary repository={repository}/>
{/each}

<Pagination {totalCount} {options}/>
