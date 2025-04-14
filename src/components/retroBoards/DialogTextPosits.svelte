<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { dialogTextPositsState } from './dialogTextPositsState.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { handlePositsListState, handlePositsState, type PositsType } from './positsState.svelte';
	import { mount, onMount } from 'svelte';

	type Props = {
		positsSelected: PositsType;
	};

	let props: Props = $props();

	let isOpen = $state(false);

	let commentRetro = $state('');

	const { setOffDialogEditPosits } = dialogTextPositsState();

	$effect(() => {
		const { isOpenDialogEditPosits } = dialogTextPositsState();
		isOpen = isOpenDialogEditPosits;
		commentRetro = props.positsSelected.detail;
	});

	async function handlerSubmit() {
		const { updatePositsText } = handlePositsState();
		const { handleUpdatePositsComment } = handlePositsListState();
		updatePositsText(props.positsSelected, commentRetro);
		if (props?.positsSelected?.id) {
			await handleUpdatePositsComment(props.positsSelected.id, commentRetro);
		}

		setOffDialogEditPosits();
	}

	async function handlerDelete() {
		const { handleDeletePosits } = handlePositsListState();
		// deletePosits(props.positsSelected);
		if (props?.positsSelected?.id) {
			await handleDeletePosits(props.positsSelected.id);
		}
		setOffDialogEditPosits();
	}
</script>

<Dialog.Root open={isOpen} onOpenChange={() => setOffDialogEditPosits()}>
	<Dialog.Content class="sm:max-w-[425px]">
		<!-- <Dialog.Header>
			<Dialog.Title>Type your comment retro</Dialog.Title>
		</Dialog.Header> -->
		<div>Type your comment retro</div>
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
			<Button onclick={handlerDelete} variant="destructive">Delete</Button>
			<Button onclick={handlerSubmit}>Submit</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
