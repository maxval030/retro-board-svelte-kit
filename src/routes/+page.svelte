<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import pb from '$lib/pocketbase';

	import TeamList from '../components/teams/TeamList.svelte';

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
