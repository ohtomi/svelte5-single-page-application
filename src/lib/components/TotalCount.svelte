<script lang="ts" module>
import type { UnResultOk } from "$lib/values";
import type { searchRepositories } from "$lib/github";

type Value = UnResultOk<Awaited<ReturnType<typeof searchRepositories>>>;

export type TotalCountProps = {
	totalCount: Value["totalCount"];
};
</script>

<script lang="ts">
    let {totalCount}: TotalCountProps = $props();

    let formattedTotalCount = $derived(new Intl.NumberFormat().format(totalCount));
</script>

<div class="max-w-screen-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
    {formattedTotalCount} repositories
</div>
