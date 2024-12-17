<script lang="ts">
import "../app.css";

let { children } = $props();
</script>

<svelte:head>
    <title>GitHub Repository Search</title>
</svelte:head>

<div class="bg-white p-4 dark:bg-gray-800">
    {@render children()}
</div>
