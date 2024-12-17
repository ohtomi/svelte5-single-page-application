<script lang="ts">
import type { Component } from "svelte";

import {
	ExternalLinkIcon,
	EyeIcon,
	ForkIcon,
	StarIcon,
	type UnArray,
	type UnResultOk,
} from "$lib/shared";

import type { searchRepositories } from "../api/search-repositories";

type Props = {
	repository: UnArray<SearchRepositoriesReturn["repositories"]>;
};

type SearchRepositoriesReturn = UnResultOk<
	Awaited<ReturnType<typeof searchRepositories>>
>;

let { repository }: Props = $props();
</script>

<div class="max-w-screen-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    {#snippet labelWithIcon(count: number, Icon: Component)}
        <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
            <Icon/>
            {count}
        </span>
    {/snippet}
    <div>
        {@render labelWithIcon(repository.watchersCount, EyeIcon)}
        {@render labelWithIcon(repository.forksCount, ForkIcon)}
        {@render labelWithIcon(repository.stargazersCount, StarIcon)}
    </div>
    <div>
        <a href={repository.htmlUrl}>
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{repository.fullName}</h2>
        </a>
    </div>
    <div class="text-xs text-gray-500 dark:text-gray-400">
        created: {repository.createdAt}
        |
        updated: {repository.updatedAt}
        |
        pushed: {repository.pushedAt}
    </div>
    <div>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{repository.description}</p>
    </div>
    {#snippet externalLink(href: string, label: string)}
        <a {href} target="_blank" class="inline-flex font-medium items-center text-blue-600 hover:underline me-2">
            {label}
            <ExternalLinkIcon/>
        </a>
    {/snippet}
    <div>
        {@render externalLink(`${repository.htmlUrl}/commits`, 'Commits')}
        {#if repository.hasIssues}
            {@render externalLink(`${repository.htmlUrl}/issues`, 'Issues')}
        {/if}
        {@render externalLink(`${repository.htmlUrl}/pulls`, 'Pull requests')}
        {#if repository.hasWiki}
            {@render externalLink(`${repository.htmlUrl}/wiki`, 'Wiki')}
        {/if}
        {@render externalLink(`${repository.htmlUrl}/releases`, 'Releases')}
        {@render externalLink(`${repository.htmlUrl}/tags`, 'Tags')}
    </div>
</div>
