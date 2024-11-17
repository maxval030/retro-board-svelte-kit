<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class={'p-3'}>
	{@render children()}
</div>
