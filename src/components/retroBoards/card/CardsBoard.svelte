<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { RetroBoardsResponse } from '$lib/pocketbase-types';

	type Props = {
		retroBoardDetail: RetroBoardsResponse;
	};

	const { retroBoardDetail }: Props = $props();

	function redirectToBoardDetail() {
		goto(`/retro-board/board-detail/${retroBoardDetail.id}`);
	}
</script>

<Card.Root class="cursor-pointer" onclick={() => redirectToBoardDetail()}>
	<Card.Header>
		<!-- <Card.Title>{teamDetail.title}</Card.Title> -->
		<Card.Title>{retroBoardDetail.title}</Card.Title>
	</Card.Header>
	<Card.Content>
		<!-- <p>Card Content</p> -->
	</Card.Content>
	<Card.Footer>
		<!-- <p>Card Footer</p> -->
	</Card.Footer>
</Card.Root>
