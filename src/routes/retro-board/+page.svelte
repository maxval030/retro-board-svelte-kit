<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Stage, Layer, Rect } from 'svelte-konva';
	import type { KonvaDragTransformEvent, KonvaMouseEvent } from 'svelte-konva';
	import type { RectConfig } from 'konva/lib/shapes/Rect';

	import Posits from './posits.svelte';
	import ColorPick from './colorPick.svelte';
	import { colorPickState } from './colorPickState.svelte';
	import { positsState } from './positsState.svelte';

	let positsRenderList = $state<RectConfig[]>([]);
	let clickToCreatePosits = $state(true);

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

		const { setPositsList } = positsState();
		const positionPointer = e.target.getRelativePointerPosition();

		const otherLayer = e.target.getLayer();

		if (otherLayer) return;
		// e.target.on('dblclick', () => {

		setPositsList(positionPointer!);
		// });
	}

	$effect(() => {
		const { positsList } = positsState();

		positsRenderList = positsList;
	});
</script>

<div>
	<button onclick={() => (positsRenderList = [])}>clear all</button>
	<label
		><input type="checkbox" bind:checked={clickToCreatePosits} />
		Click to create posits
	</label>

	<div>
		<ColorPick />
		<Stage width={window.innerWidth} height={window.innerHeight} onclick={addPosits} draggable>
			<Layer width={window.innerWidth} height={window.innerHeight}>
				{#each positsRenderList as positsItem, i}
					<Posits {positsItem} ondragend={handlerDragend} ondragstart={handlePositsChangeZIndex} />
				{/each}
			</Layer>
		</Stage>
	</div>
</div>
