<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { dialogEditTextPositsState } from './dialogEditTextPositsState.svelte';
	import { Textarea, type FormTextareaEvent } from '$lib/components/ui/textarea/index.js';

	let isOpen = $state(false);

	let commentRetro = $state('');
	const { setOpenDialogEditPosits, setOffDialogEditPosits } = dialogEditTextPositsState();
	$effect(() => {
		const { isOpenDialogEditPosits } = dialogEditTextPositsState();
		isOpen = isOpenDialogEditPosits;
		commentRetro = '';
	});

	function handlerSubmit() {
		// e.target.value;
		console.log('commentRetro>>>,', commentRetro);
		setOffDialogEditPosits();
	}
</script>

<Dialog.Root
	open={isOpen}
	onOpenChange={() => setOpenDialogEditPosits(false)}
	closeOnOutsideClick={false}
	closeOnEscape
>
	<!-- <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger> -->
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Type your comment retro</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Textarea
					bind:value={commentRetro}
					class="col-span-4"
					name="retro-comment"
					placeholder="Type your retro comment"
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={handlerSubmit}>Submit</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
