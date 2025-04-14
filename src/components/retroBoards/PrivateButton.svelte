<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Popover from '$lib/components/ui/popover/index';
	import Icon from '@iconify/svelte';

	import { handleBoardState } from '../../routes/retro-board/board-detail/[boardId]/boardState.svelte';
	const { boardId } = $props();
	const { isBoardPrivate, updateBoardIsPrivate, setIsBoardPrivate } = handleBoardState();

	let isPrivate = $state(isBoardPrivate);

	async function handleUpdateBoardIsPrivate(isPrivate: boolean) {
		if (boardId) {
			await updateBoardIsPrivate(boardId, isPrivate);
		}
	}

	$effect(() => {
		console.log(isBoardPrivate);
		isPrivate = isBoardPrivate;
	});
</script>

<div>
	<Button onclick={handleUpdateBoardIsPrivate}>
		{#if isPrivate}
			<Icon icon="iconamoon:eye-off-light" class={'mr-1'} />Private Mode
		{:else}
			<Icon icon="majesticons:eye-line" class={'mr-1'} /> Public Mode
		{/if}
	</Button>
	<input
		type="checkbox"
		bind:checked={isPrivate}
		on:change={(e) => handleUpdateBoardIsPrivate(e?.target?.checked)}
	/>
</div>
