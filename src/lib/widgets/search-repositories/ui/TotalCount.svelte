<script lang="ts">
import type { UnResultOk } from "$lib/shared";

import type { searchRepositories } from "../api/search-repositories";

type Props = {
	totalCount: SearchRepositoriesReturn["totalCount"];
};

type SearchRepositoriesReturn = UnResultOk<
	Awaited<ReturnType<typeof searchRepositories>>
>;

let { totalCount }: Props = $props();

let formattedTotalCount = $derived(new Intl.NumberFormat().format(totalCount));
</script>

<div class="max-w-screen-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
    {formattedTotalCount} repositories
</div>
