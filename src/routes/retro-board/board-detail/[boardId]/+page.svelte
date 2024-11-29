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

	async function handlerDragend(event: KonvaDragTransformEvent) {
		const tempEvent = event.target;

		const id = tempEvent.attrs.id;
		// const x = event.target.x();
		// const y = event.target.y();
		// const test = event.currentTarget.getTransform()
		// const x = event.currentTarget.x();
		// const y = event.currentTarget.y();
		const stage = event.target.getStage();
		const pointerPosition = stage?.getPointerPosition()!;
		const offset = { x: event.target.attrs.x, y: event.target.attrs.y };

		const shapeClickX = pointerPosition.x - offset.x;
		const shapeClickY = pointerPosition.y - offset.y;

		// console.log('x>>>', x, 'y>>>>', y);
		// const newX = x - newPosition?.x!;
		// const newY = y - newPosition?.y!;
		// event.currentTarget.stopDrag();
		// console.log('🚀 ~ handlerDragend ~ newPosition:', newPosition);
		// console.log('🚀 ~ handlerDragend ~ y:', y);
		// console.log('🚀 ~ handlerDragend ~ x:', x);

		// await handleUpdatePositsPosition(a?.x!, a?.y!, id);
		await handleUpdatePositsPosition(shapeClickX, shapeClickY, id);
		// handleUpdatePosits
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
		// e.target.on('dblclick', () => {

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
					// const positsListUpdate = positsRenderList.find(
					// 	(item) => item.id === itemOnBoardUpdate.id
					// );
					// const positsListUpdate = positsRenderList.((item) => {
					// 	if (item.id === itemOnBoardUpdate.id) {
					// 		return {
					// 			id: itemOnBoardUpdate.id,
					// 			x: itemOnBoardUpdate.x,
					// 			y: itemOnBoardUpdate.y,
					// 			width: itemOnBoardUpdate.width,
					// 			height: itemOnBoardUpdate.height,
					// 			fill: itemOnBoardUpdate.fill,
					// 			draggable: itemOnBoardUpdate.draggable,
					// 			detail: itemOnBoardUpdate.detail
					// 		};
					// 	}
					// 	return item;
					// });

					// positsRenderList = positsListUpdate;
					// setPositsToList
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
							ondragend={handlerDragend}
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
