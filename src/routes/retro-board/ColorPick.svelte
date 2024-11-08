<script lang="ts">
	import { colorPickState } from './colorPickState.svelte';
	let color = $state<string>('');

	const { colorList, setColor } = colorPickState();

	$effect(() => {
		// setColor();
		// colorPickHandle();
		const { positsSetColor } = colorPickState();
		color = positsSetColor;
	});
</script>

<div>
	{#each colorList as color}
		<div
			style="background-color: {color}; width: 50px; height: 50px; display: inline-block; cursor: pointer;"
			onclick={() => setColor(color)}
			id={color}
		></div>
	{/each}
	<div style="background-color: {color}; width: 50px; height: 50px; display: inline-block;"></div>
</div>
