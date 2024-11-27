<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import pb from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import TeamList from '../components/teams/TeamList.svelte';
	// import { PUBLIC_END_POINT_POCKETBASE_URL } from '$env/static/public';
	// console.log(PUBLIC_END_POINT_POCKETBASE_URL);
	onMount(async () => {
		const resultList = await pb.collection('itemsOnBoard').getList(1, 50);

		console.log('🚀 ~ resultList:', resultList);
	});

	async function login() {
		await pb.collection('users').authWithOAuth2({
			provider: 'google'
		});
	}
</script>

<div class="mx-2">
	<Button href="/retro-board">Go to retro board</Button>
	<Button onclick={login}>logIn</Button>
	<div class="mt-3">
		<TeamList />
	</div>
</div>
