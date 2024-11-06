<script lang="ts">
    type Props = {
        cause: string;
    };

    let {cause}: Props = $props();
</script>

<div>
    {cause}
</div>
