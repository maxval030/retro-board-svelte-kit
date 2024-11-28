<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import CardsBoard from '../../../../components/retroBoards/card/CardsBoard.svelte';
	import { handlerRetroBoardState } from './boardListState.svelte';
	import type { RetroBoardsResponse } from '$lib/pocketbase-types';

	let retroBoardList = $state<RetroBoardsResponse[]>([]);

	onMount(async () => {
		const { getRetroBoardListByTeamId } = handlerRetroBoardState();
		await getRetroBoardListByTeamId();
	});

	onDestroy(() => {
		handlerRetroBoardState().clearRetroBoardListByTeamId();
	});

	$effect(() => {
		const { retroBoardListByTeamId } = handlerRetroBoardState();
		retroBoardList = retroBoardListByTeamId;
	});

	// onMount(() => {
	// });
</script>

<div class="grid w-full grid-cols-4 gap-4">
	{#each retroBoardList as retroBoard}
		<CardsBoard retroBoardDetail={retroBoard} />
	{/each}
	<!-- <CardsBoard /> -->
</div>
