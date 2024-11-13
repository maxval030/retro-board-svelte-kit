<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';

	let privateMode = $state(false);

	$effect(() => {
		console.log('🚀 ~ file: PrivateMode.svelte ~ line 3 ~ privateMode', privateMode);
	});
</script>

<div>
	<Button onclick={() => (privateMode = !privateMode)}>
		{#if privateMode}
			<Icon icon="iconamoon:eye-off-light" />Private Mode
		{:else}
			<Icon icon="majesticons:eye-line" /> Public Mode
		{/if}
	</Button>
</div>
