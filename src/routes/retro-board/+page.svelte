<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Stage, Layer, Rect } from 'svelte-konva';
	import type { KonvaDragTransformEvent, KonvaMouseEvent } from 'svelte-konva';
	import type { RectConfig } from 'konva/lib/shapes/Rect';

	import Posits from './posits.svelte';
	import ColorPick from './colorPick.svelte';
	import { colorPickHandle } from './colorPickHandler.svelte';

	let positsList = $state<RectConfig[]>([]);
	let clickToCreatePosits = $state(true);

	function handlerDragend(event: KonvaDragTransformEvent) {
		console.log('🚀 ~ moveEndHandler ~ event:', event);
	}

	function handlePositsChangeZIndex(event: KonvaDragTransformEvent) {
		if (clickToCreatePosits) return;
		let target = event.target;

		target.moveToTop();

		target.on('dblclick', () => {
			console.log('🚀 ~ target.on ~ dblclick');
			let textPosition = target.getAbsolutePosition();
			// console.log('🚀 ~ target.on ~ textPosition:', textPosition);

			const a = document.getElementById('layer1');
			console.log(a);
			// let areaPosition = {
			// 	x: window.innerWidth + textPosition.x,
			// 	y: window.innerHeight + textPosition.y
			// };

			// let textarea = document.createElement('textarea');
			// document.body.appendChild(textarea);
			// then lets find position of stage container on the page:

			// target.destroy();
			// configPosits = configPosits.filter((item) => item.id !== target.attrs.id);
		});
	}

	function addPosits(e: KonvaMouseEvent) {
		if (!clickToCreatePosits) return;

		const { positsSetColor } = colorPickHandle();
		const positionPointer = e.target.getRelativePointerPosition();
		e.target.getAbsolutePosition();
		console.log('🚀 ~ addPosits ~ positionPointer:', positionPointer);

		positsList.push({
			x: positionPointer?.x,
			y: positionPointer?.y,
			width: 130,
			height: 150,
			fill: positsSetColor,
			draggable: true,
			id: new Date().getTime().toString()
		});
	}
</script>

<div>
	<button onclick={() => (positsList = [])}>clear all</button>
	<label
		><input type="checkbox" bind:checked={clickToCreatePosits} />
		Click to create posits
	</label>

	<div>
		<ColorPick />
		<Stage width={window.innerWidth} height={window.innerHeight} onclick={addPosits}>
			<Layer width={window.innerWidth} height={window.innerHeight}>
				{#each positsList as positsItem, i}
					<Posits
						{positsItem}
						ondragend={handlerDragend}
						ondragstart={handlePositsChangeZIndex}
						onclick={handlePositsChangeZIndex}
					/>
				{/each}
			</Layer>
		</Stage>
	</div>
</div>
