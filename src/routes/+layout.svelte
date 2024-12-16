<svelte:head>
    <title>GitHub Repository Search</title>
</svelte:head>

<script lang="ts">
import "../app.css";

let { children } = $props();
</script>

<div class="bg-white p-4 dark:bg-gray-800">
    {@render children()}
</div>
