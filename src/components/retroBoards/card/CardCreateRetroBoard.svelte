<script>
	import * as Card from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';
	import DialogCreateRetroBoard from './DialogCreateRetroBoard.svelte';
	import { handleCardCreateRetroBoardState } from './cardCrateRetroBoaed.svelte';

	const { setIsOpenDialogCreateRetroBoard } = handleCardCreateRetroBoardState();

	let isOpen = $state(false);

	$effect(() => {
		const { isOpenDialogCreateRetroBoard } = handleCardCreateRetroBoardState();
		isOpen = isOpenDialogCreateRetroBoard;
	});
</script>

<Card.Root class="cursor-pointer" onclick={() => setIsOpenDialogCreateRetroBoard(true)}>
	<Card.Header>
		<Card.Title>Add new retro board</Card.Title>
	</Card.Header>
	<Card.Content>
		<p><Icon icon="solar:add-square-bold" width="30%" height="30%" /></p>
	</Card.Content>
	<Card.Footer>
		<!-- <p>Card Footer</p> -->
	</Card.Footer>
</Card.Root>
{#if isOpen}
	<DialogCreateRetroBoard {isOpen} />
{/if}
