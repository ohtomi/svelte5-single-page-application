<script lang="ts" module>
import type { UnResultOk } from "$lib/shared/model/values";
import type { searchRepositories } from "$lib/shared/api/github";

type Value = UnResultOk<Awaited<ReturnType<typeof searchRepositories>>>;

export type PaginationProps = {
	totalCount: Value["totalCount"];
	options: Value["options"];
};
</script>

<script lang="ts">
    import {encodeSearchParameters} from './locationEncoder';
    import LeftArrowIcon from '$lib/shared/ui/LeftArrowIcon.svelte';
    import RightArrowIcon from '$lib/shared/ui/RightArrowIcon.svelte';
    import {listPageNumbers} from './paginators';

    let {totalCount, options}: PaginationProps = $props();

    let currentPage = $derived(options.page);
    let perPage = $derived(options.per_page ?? 1);
    let lastPage = $derived(Math.ceil(totalCount / perPage));

    let pageNumbers = $derived(listPageNumbers(currentPage, lastPage));

    let toHref = $derived((page: number) => encodeSearchParameters(options.q, options.sort, options.order, options.per_page, page));
</script>

<nav aria-label="Page navigation">
    <ul class="flex items-center -space-x-px h-8 text-sm">
        <li>
            <a href={toHref(pageNumbers.previous)} class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <LeftArrowIcon/>
            </a>
        </li>
        {#each pageNumbers.pages as page (page)}
            {#if page === currentPage}
                <li>
                    <a href={toHref(page)} aria-current="page" class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{page}</a>
                </li>
            {:else}
                <li>
                    <a href={toHref(page)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</a>
                </li>
            {/if}
        {/each}
        <li>
            <a href={toHref(pageNumbers.next)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Next</span>
                <RightArrowIcon/>
            </a>
        </li>
    </ul>
</nav>
