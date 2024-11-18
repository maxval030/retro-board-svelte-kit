<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { dialogTextPositsState } from './dialogTextPositsState.svelte';
	import { Textarea, type FormTextareaEvent } from '$lib/components/ui/textarea/index.js';
	import { handlePositsState, type PositsListType } from './positsState.svelte';

	type Props = {
		positsSelected: PositsListType;
	};

	let props: Props = $props();

	let isOpen = $state(false);

	let commentRetro = $state('');

	const { setOffDialogEditPosits } = dialogTextPositsState();

	$effect(() => {
		const { isOpenDialogEditPosits } = dialogTextPositsState();
		isOpen = isOpenDialogEditPosits;
		commentRetro = props.positsSelected.text;
	});

	function handlerSubmit() {
		const { updatePositsText } = handlePositsState();
		updatePositsText(props.positsSelected, commentRetro);
		setOffDialogEditPosits();
	}
</script>

<Dialog.Root open={isOpen} onOpenChange={() => setOffDialogEditPosits()}>
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
			<Button onclick={handlerSubmit}>Submit</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
