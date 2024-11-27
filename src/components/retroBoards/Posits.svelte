<script lang="ts">
	import { Rect, Group, Text } from 'svelte-konva';
	import type { KonvaDragTransformEvent, KonvaMouseEvent } from 'svelte-konva';
	import { dialogTextPositsState } from './dialogTextPositsState.svelte';
	import { handlePositsState, type PositsListType } from './positsState.svelte';
	import { privateButtonState } from './privateButtonState.svelte';
	const fontSizeText = 16;
	let props: {
		positsItem: PositsListType;
		ondragend: (event: KonvaDragTransformEvent) => void;
		ondragstart: (event: KonvaDragTransformEvent) => void;
	} = $props();

	let name = 'test create';
	let positsText = $state<string>('');

	function handlerEditTextPosits(e: KonvaMouseEvent) {
		const { setOpenDialogEditPosits } = dialogTextPositsState();
		const { setPosits } = handlePositsState();

		const target = e.target;
		target.on('dblclick', () => {
			setOpenDialogEditPosits();
			setPosits(props.positsItem);
			// target.get
			// document.body.appendChild(textarea);
		});
	}

	$effect(() => {
		const text = props.positsItem.text;
		const { isPrivateMode } = privateButtonState();

		if (isPrivateMode) {
			positsText = text.replace(/./g, '~');

			return;
		}
		positsText = text;
	});
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
		text={positsText}
		verticalAlign="top"
		padding={10}
		fontSize={fontSizeText}
		fill="black"
		align="left"
		width={130}
		height={150}
		x={props.positsItem.x}
		y={props.positsItem.y}
	/>
	<Text
		text={`cr: ${name}`}
		verticalAlign="bottom"
		fontSize={fontSizeText}
		fill="black"
		align="right"
		width={130}
		height={150}
		x={props.positsItem.x}
		y={props.positsItem.y}
	/>
</Group>
