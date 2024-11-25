<script>
	import '../app.css';

	let { children } = $props();
	// console.log('🚀 ~ data:', data);
</script>

<div class={'p-3'}>
	{@render children()}
</div>
