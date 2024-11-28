<script>
	import * as Card from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';
	import { handleCardCreateTeamState } from './cardCreateTeamState.svelte';
	import DialogCreateTeam from './DialogCreateTeam.svelte';
	let isOpen = $state(false);

	const { setIsOpenDialogCreateTeam } = handleCardCreateTeamState();
	async function addNewTeam() {
		console.log('Add New Team');
	}

	$effect(() => {
		const { isOpenDialogCreateTeam } = handleCardCreateTeamState();
		isOpen = isOpenDialogCreateTeam;
	});
</script>

<Card.Root class="cursor-pointer" onclick={() => setIsOpenDialogCreateTeam(true)}>
	<Card.Header>
		<Card.Title>Add new team</Card.Title>
	</Card.Header>
	<Card.Content>
		<p><Icon icon="solar:add-square-bold" width="30%" height="30%" /></p>
	</Card.Content>
	<Card.Footer>
		<!-- <p>Card Footer</p> -->
	</Card.Footer>
</Card.Root>
{#if isOpen}
	<DialogCreateTeam {isOpen} />
{/if}
