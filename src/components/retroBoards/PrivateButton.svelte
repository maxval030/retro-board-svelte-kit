<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import { privateButtonState } from './privateButtonState.svelte';
	let isPrivateState = $state(false);

	const { setPrivateMode } = privateButtonState();

	$effect(() => {
		const { isPrivateMode } = privateButtonState();

		isPrivateState = isPrivateMode;
	});
</script>

<div>
	<Button onclick={() => setPrivateMode()}>
		{#if isPrivateState}
			<Icon icon="iconamoon:eye-off-light" class={'mr-1'} />Private Mode
		{:else}
			<Icon icon="majesticons:eye-line" class={'mr-1'} /> Public Mode
		{/if}
	</Button>
</div>
