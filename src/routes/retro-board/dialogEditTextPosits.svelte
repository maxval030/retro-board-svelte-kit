<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { dialogEditTextPositsState } from './dialogEditTextPositsState.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	let isOpen = $state(false);
	const { setOpenDialogEditPosits } = dialogEditTextPositsState();
	$effect(() => {
		const { isOpenDialogEditPosits } = dialogEditTextPositsState();
		isOpen = isOpenDialogEditPosits;
	});

	function handlerSubmit() {
		console.log(e);
		e.preventDefault();
		console.log('submit');
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
			<!-- <Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description> -->
		</Dialog.Header>
		<form onsubmit={handlerSubmit}>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Textarea class="col-span-4" name="retro-comment" placeholder="Type your retro comment" />
				</div>
				<!-- <div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">Username</Label>
				<Input id="username" value="@peduarte" class="col-span-3" />
			</div> -->
			</div>
			<Dialog.Footer>
				<Button type="submit" onclick={() => console.log(123)}>Submit</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
