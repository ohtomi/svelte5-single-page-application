<script lang="ts">
import { goto } from "$app/navigation";
import { encodeSearchParameters, SearchIcon } from "$lib/shared";

import { autoSubmit } from "./autoSubmitter.svelte.js";

type Props = {
	q: string;
};

let { q = $bindable() }: Props = $props();

let handleClick = () => {
	goto(`/${encodeSearchParameters(q)}`);
};

let buttonRef: HTMLButtonElement | undefined = $state();
</script>

<div class="max-w-screen-md">
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon/>
        </div>
        <!-- svelte-ignore a11y_autofocus -->
        <input bind:value={q} autofocus use:autoSubmit={() => ({button: buttonRef})} type="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <button onclick={handleClick} bind:this={buttonRef} type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</div>
