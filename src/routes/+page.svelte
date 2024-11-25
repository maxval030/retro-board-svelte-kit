<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import pb from '$lib/pocketbase';
	import { onMount } from 'svelte';
	// import { PUBLIC_END_POINT_POCKETBASE_URL } from '$env/static/public';
	// console.log(PUBLIC_END_POINT_POCKETBASE_URL);
	onMount(async () => {
		const resultList = await pb.collection('users').getList(1, 50, {
			filter: 'someField1 != someField2'
		});

		console.log('🚀 ~ resultList:', resultList);
	});
</script>

<div>
	<Button href="/retro-board">Go to retro board</Button>
</div>
