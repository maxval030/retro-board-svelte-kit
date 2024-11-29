<script lang="ts">
	import { onMount } from 'svelte';
	import CardCreateTeam from './card/CardCreateTeam.svelte';
	import CardsTeam from './card/CardsTeam.svelte';
	import pb from '$lib/pocketbase';
	import { Collections, type TeamsRecord, type TeamsResponse } from '$lib/pocketbase-types';
	let teamList: TeamsResponse[] = $state([]);
	onMount(async () => {
		const result = await pb
			.collection(Collections.Teams)
			.getList<TeamsResponse>(1, 20, { sort: '-updated' });
		teamList = result.items;
	});
</script>

<div class="grid w-full grid-cols-4 gap-4">
	<CardCreateTeam />
	{#each teamList as team}
		<CardsTeam teamDetail={team} />
	{/each}
</div>
