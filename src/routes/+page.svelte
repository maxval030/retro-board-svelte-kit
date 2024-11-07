<!-- <script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Stage, Layer, Rect } from 'svelte-konva';
	import type { KonvaDragTransformEvent } from 'svelte-konva';
	type ConfigPositsType = {
		x: number;
		y: number;
		width: number;
		height: number;
		stroke?: string;
		strokeWidth?: number;
		fill: string;
		draggable: boolean;
		id: string;
	};
	let color = $state('red');

	let configPosits = $state<ConfigPositsType[]>([
		{
			x: 250,
			y: 100,
			width: 130,
			height: 150,
			// stroke: 'black',
			// strokeWidth: 2,
			fill: color,
			draggable: true,
			id: new Date().getTime().toString()
		}
	]);

	function handlerDragend(event: KonvaDragTransformEvent) {
		console.log('🚀 ~ moveEndHandler ~ event:', event);
	}

	function handlePositsChangeZIndex(event: KonvaDragTransformEvent) {
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

	function addPosits() {
		configPosits.push({
			x: 250,
			y: 100,
			width: 130,
			height: 150,
			fill: color,
			draggable: true,
			id: new Date().getTime().toString()
		});
	}
</script>

<button onclick={addPosits}>Add posits</button>
<button
	onclick={() => {
		color = '#fc8d59';
	}}>Red</button
>
<button
	onclick={() => {
		color = '#e6f598';
	}}>Blue</button
>
<div>
	<Stage width={window.innerWidth} height={window.innerHeight}>
		<Layer>
			{#each configPosits as positsItem, i}
				<Rect
					cornerRadius={3}
					{...positsItem}
					shadowColor="black"
					shadowBlur={10}
					shadowOffset={{ x: 10, y: 10 }}
					shadowOpacity={0.2}
					ondragend={handlerDragend}
					ondragstart={handlePositsChangeZIndex}
					onclick={handlePositsChangeZIndex}
				/>
			{/each}
		</Layer>
	</Stage>
</div> -->
