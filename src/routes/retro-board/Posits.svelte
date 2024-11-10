<script lang="ts">
	import { Rect, Group, Text } from 'svelte-konva';
	import type { KonvaDragTransformEvent, KonvaMouseEvent } from 'svelte-konva';
	import type { RectConfig } from 'konva/lib/shapes/Rect';
	import { dialogEditTextPositsState } from './dialogEditTextPositsState.svelte';
	import { handlePositsState } from './positsState.svelte';

	let props: {
		positsItem: RectConfig;
		ondragend: (event: KonvaDragTransformEvent) => void;
		ondragstart: (event: KonvaDragTransformEvent) => void;
	} = $props();

	let name = 'test create';

	function handlerEditTextPosits(e: KonvaMouseEvent) {
		const { setOpenDialogEditPosits } = dialogEditTextPositsState();
		const {setPosits} = handlePositsState()

		const target = e.target;
		target.on('dblclick', () => {
			setOpenDialogEditPosits();
			setPosits(props.positsItem.id)
			// target.get
			// document.body.appendChild(textarea);
		});
	}

</script>

<Group
	draggable
	ondragend={props.ondragend}
	ondragstart={props.ondragstart}
	onclick={handlerEditTextPosits}
	id={`group-${props.positsItem.id}`}
>
	<Rect
		cornerRadius={3}
		{...props.positsItem}
		shadowColor="black"
		shadowBlur={10}
		shadowOffset={{ x: 10, y: 10 }}
		shadowOpacity={0.2}
		
	/>
	<Text
		text={`cr: ${name}`}
		verticalAlign="bottom"
		fontSize={12}
		fill="black"
		align="right"
		width={130}
		height={150}
		x={props.positsItem.x}
		y={props.positsItem.y}
	/>
</Group>
