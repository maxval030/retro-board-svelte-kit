<script lang="ts">
	import { Stage, Layer } from 'svelte-konva';
	import type { KonvaDragTransformEvent, KonvaMouseEvent } from 'svelte-konva';
	import { Button } from '$lib/components/ui/button';
	import {
		handlePositsListState,
		handlePositsState,
		type PositsListType
	} from '../../../../components/retroBoards/positsState.svelte';
	import { dialogTextPositsState } from '../../../../components/retroBoards/dialogTextPositsState.svelte';
	import ColorPick from '../../../../components/retroBoards/ColorPick.svelte';
	import PrivateButton from '../../../../components/retroBoards/PrivateButton.svelte';
	import Posits from '../../../../components/retroBoards/Posits.svelte';
	import DialogEditTextPosits from '../../../../components/retroBoards/DialogTextPosits.svelte';

	let positsRenderList = $state<PositsListType[]>([]);
	let posits = $state<PositsListType | undefined>();
	let clickToCreatePosits = $state(true);
	let isOpenDialogEdit = $state(false);

	const { setPositsList, clearPositsList } = handlePositsListState();

	function handlerDragend(event: KonvaDragTransformEvent) {
		// console.log('🚀 ~ moveEndHandler ~ event:', event);
	}

	function handlePositsChangeZIndex(event: KonvaDragTransformEvent) {
		// if (clickToCreatePosits) return;
		let target = event.target;

		target.moveToTop();
	}

	function addPosits(e: KonvaMouseEvent) {
		if (!clickToCreatePosits) return;

		const positionPointer = e.target.getRelativePointerPosition();

		const otherLayer = e.target.getLayer();

		if (otherLayer) return;
		// e.target.on('dblclick', () => {

		setPositsList(positionPointer!);
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
