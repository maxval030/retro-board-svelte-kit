<script lang="ts">
	import { Rect, Group, Text } from 'svelte-konva';
	import type { RectConfig } from 'konva/lib/shapes/Rect';
	import type { KonvaDragTransformEvent } from 'svelte-konva';

	let props: {
		positsItem: RectConfig;
		ondragend: (event: KonvaDragTransformEvent) => void;
		ondragstart: (event: KonvaDragTransformEvent) => void;
		onclick: (event: KonvaDragTransformEvent) => void;
	} = $props();

	let name = 'test create';
</script>

<Group
	draggable
	ondragend={props.ondragend}
	ondragstart={props.ondragstart}
	onclick={props.onclick}
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
