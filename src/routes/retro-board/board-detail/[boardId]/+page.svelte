<script lang="ts">
	import { Stage, Layer } from 'svelte-konva';
	import type { KonvaDragTransformEvent, KonvaMouseEvent } from 'svelte-konva';
	import { Button } from '$lib/components/ui/button';
	import {
		handlePositsListState,
		handlePositsState,
		type PositsType
	} from '../../../../components/retroBoards/positsState.svelte';
	import { dialogTextPositsState } from '../../../../components/retroBoards/dialogTextPositsState.svelte';
	import ColorPick from '../../../../components/retroBoards/ColorPick.svelte';
	import PrivateButton from '../../../../components/retroBoards/PrivateButton.svelte';
	import Posits from '../../../../components/retroBoards/Posits.svelte';
	import DialogEditTextPosits from '../../../../components/retroBoards/DialogTextPosits.svelte';
	import { onDestroy, onMount } from 'svelte';
	import pb from '$lib/pocketbase';
	import { Collections, type ItemsOnBoardResponse } from '$lib/pocketbase-types';

	let { data }: { data: { boardId: string } } = $props();

	let positsRenderList = $state<PositsType[]>([]);
	let posits = $state<PositsType | undefined>();
	let clickToCreatePosits = $state(true);
	let isOpenDialogEdit = $state(false);

	const {
		handleCreatePosits,
		clearPositsList,
		setPositsList,
		setPositsToList,
		setUpdatePositsList,
		handleUpdatePositsPosition
	} = handlePositsListState();

	async function handlerDragEnd(event: KonvaDragTransformEvent) {
		const positsById = positsRenderList.find((item) => item.id === event.target.attrs.id);

		const defaultX = positsById?.x ?? 0;
		const defaultY = positsById?.y ?? 0;
		const tempEvent = event.target;
		// console.log('event>>>', event);

		const { x, y } = tempEvent.position();
		console.log('🚀 ~ handlerDragEnd ~  x, y:', x, y);

		const positionX = defaultX + x;
		console.log('🚀 ~ handlerDragEnd ~ positionX:', positionX);
		const positionY = defaultY + y;
		console.log('🚀 ~ handlerDragEnd ~ positionY:', positionY);

		await handleUpdatePositsPosition(positionX, positionY, positsById?.id!);
	}

	function handlePositsChangeZIndex(event: KonvaDragTransformEvent) {
		// if (clickToCreatePosits) return;
		let target = event.target;

		target.moveToTop();
	}

	async function addPosits(e: KonvaMouseEvent) {
		if (!clickToCreatePosits) return;

		const positionPointer = e.target.getRelativePointerPosition();

		const otherLayer = e.target.getLayer();

		if (otherLayer) return;

		await handleCreatePosits(positionPointer!, data.boardId);
		// });
	}

	$effect(() => {
		const { positsList } = handlePositsListState();

		positsRenderList = positsList;
	});

	$effect(() => {
		const { positsSelected } = handlePositsState();

		posits = positsSelected;
	});

	$effect(() => {
		const { isOpenDialogEditPosits } = dialogTextPositsState();
		isOpenDialogEdit = isOpenDialogEditPosits;
	});

	onMount(async () => {
		const pbItemsOnBoard = pb.collection(Collections.ItemsOnBoard);
		// const { getPositsListByBoardId } = handlePositsListState();
		const result = await pbItemsOnBoard.getList<ItemsOnBoardResponse>(1, 20000, {
			filter: pb.filter('retroboardId={:boardId}', { boardId: data.boardId })
		});

		if (result.items.length > 0) {
			const positsList = result.items.map((item) => {
				return {
					id: item.id,
					x: item.x,
					y: item.y,
					width: item.width,
					height: item.height,
					fill: item.fill,
					draggable: item.draggable,
					detail: item.detail
				};
			});

			setPositsList(positsList);
		}
		// getPositsListByBoardId(data.boardId);
		await pbItemsOnBoard.subscribe('*', async ({ action, record }) => {
			switch (action) {
				case 'create':
					const itemOnBoard = await pb
						.collection(Collections.ItemsOnBoard)
						.getOne<ItemsOnBoardResponse>(record.id);

					setPositsToList({
						id: itemOnBoard.id,
						x: itemOnBoard.x,
						y: itemOnBoard.y,
						width: itemOnBoard.width,
						height: itemOnBoard.height,
						fill: itemOnBoard.fill,
						draggable: itemOnBoard.draggable,
						detail: itemOnBoard.detail
					});
					break;
				case 'update':
					console.log("TESTasdasd")
					const itemOnBoardUpdate = await pb
						.collection(Collections.ItemsOnBoard)
						.getOne<ItemsOnBoardResponse>(record.id);

					setUpdatePositsList({
						id: itemOnBoardUpdate.id,
						x: itemOnBoardUpdate.x,
						y: itemOnBoardUpdate.y,
						width: itemOnBoardUpdate.width,
						height: itemOnBoardUpdate.height,
						fill: itemOnBoardUpdate.fill,
						draggable: itemOnBoardUpdate.draggable,
						detail: itemOnBoardUpdate.detail
					});

					break;
				case 'delete':
					const positsListDelete = positsRenderList.filter((item) => item.id !== record.id);

					positsRenderList = positsListDelete;
					break;
			}
			// if (action === 'create') {
			// 	// const { getPositsListByBoardId } = handlePositsListState();
			// 	const itemOnBoard = await pb
			// 		.collection(Collections.ItemsOnBoard)
			// 		.getOne<ItemsOnBoardResponse>(record.id);

			// 	setPositsToList({
			// 		id: itemOnBoard.id,
			// 		x: itemOnBoard.x,
			// 		y: itemOnBoard.y,
			// 		width: itemOnBoard.width,
			// 		height: itemOnBoard.height,
			// 		fill: itemOnBoard.fill,
			// 		draggable: itemOnBoard.draggable,
			// 		detail: itemOnBoard.detail
			// 	});
			// }
		});
	});
	// onDestroy(() => {

	// })
</script>

<div class={'relative'}>
	<div class={'absolute left-5 top-5 z-30 w-1/4 rounded-lg border border-cyan-400 bg-white p-3'}>
		<Button onclick={clearPositsList}>clear all</Button>
		<label>
			<input type="checkbox" bind:checked={clickToCreatePosits} />
			Click to create posits
		</label>
		<ColorPick />
		<PrivateButton />
	</div>

	<div>
		<div class="mt-2 h-screen w-full border border-sky-500">
			<!-- <Stage width={window.innerWidth} height={window.innerHeight} onclick={addPosits} draggable> -->
			<Stage width={1920} height={1080} onclick={addPosits} draggable>
				<Layer width={window.innerWidth} height={window.innerHeight}>
					{#each positsRenderList as positsItem, i}
						<Posits
							{positsItem}
							ondragend={handlerDragEnd}
							ondragstart={handlePositsChangeZIndex}
						/>
					{/each}
				</Layer>
			</Stage>
		</div>
	</div>
	{#if posits && isOpenDialogEdit}
		<DialogEditTextPosits positsSelected={posits} />
	{/if}
</div>
