<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { TeamsResponse } from '$lib/pocketbase-types';

	type Props = {
		teamDetail: TeamsResponse;
	};

	const { teamDetail }: Props = $props();

	function redirectToTeamDetail() {
		console.log('Redirect to Team Detail');
		goto(`/retro-board/list/${teamDetail.id}`);
	}
</script>

<Card.Root class="cursor-pointer" onclick={() => redirectToTeamDetail()}>
	<Card.Header>
		<Card.Title>{teamDetail.title}</Card.Title>
	</Card.Header>
	<Card.Content>
		<!-- <p>Card Content</p> -->
	</Card.Content>
	<Card.Footer>
		<!-- <p>Card Footer</p> -->
	</Card.Footer>
</Card.Root>
