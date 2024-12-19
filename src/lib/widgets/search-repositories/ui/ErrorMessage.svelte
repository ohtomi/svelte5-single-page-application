<script lang="ts">
type Props = {
	cause: string;
};

let { cause }: Props = $props();
</script>

<div class="max-w-screen-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
    {cause}
</div>
