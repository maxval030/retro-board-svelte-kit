<script lang="ts">
	import { handlerRetroBoardState } from '../../../routes/retro-board/list/[teamId]/boardListState.svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Textarea } from '$lib/components/ui/textarea';
	import { handleCardCreateRetroBoardState } from './cardCrateRetroBoaed.svelte';
	import { onDestroy } from 'svelte';
	// import { handleCardCreateTeamState } from './cardCreateTeamState.svelte';
	// import {teamIdState} = handlerRetroBoardState()
	type Props = {
		isOpen: boolean;
	};

	let teamId = $state<string>('');

	const { teamIdState } = handlerRetroBoardState();

	const { isOpen }: Props = $props();

	const { setIsOpenDialogCreateRetroBoard } = handleCardCreateRetroBoardState();
	$effect(() => {
		const { isOpenDialogCreateRetroBoard } = handleCardCreateRetroBoardState();
		setIsOpenDialogCreateRetroBoard(isOpenDialogCreateRetroBoard);

		teamId = teamIdState;
	});

	onDestroy(() => {
		handlerRetroBoardState().clearTeamId();
	});
</script>

<Dialog.Root
	open={isOpen}
	onOpenChange={() => setIsOpenDialogCreateRetroBoard(false)}
	controlledOpen
>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Retro board</Dialog.Title>
		</Dialog.Header>
		<form method="post" action="?/createRetroBoard">
			<input type="hidden" name="teamId" value={teamIdState} />
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Textarea class="col-span-4" name="retroBoardTitle" placeholder="Type your team title." />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Submit</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
